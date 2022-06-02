import { SES } from '@aws-sdk/client-ses'
import type { NextApiRequest, NextApiResponse } from 'next'
import { createTransport } from 'nodemailer'

import { BannedTokenSchema } from '~/backend/schemas/BannedTokenSchema'
import { FinanceGameSchema } from '~/backend/schemas/FinanceGameSchema'
import { initDatabase } from '~/backend/utils/initDatabase'
import { verifyAuthToken } from '~/backend/utils/verifyAuthToken'

export default async function handler(req: NextApiRequest, res: NextApiResponse<{ error?: string }>): Promise<void> {
  try {
    if (req.method === 'POST') {
      if (!(await verifyAuthToken(req.headers.authorization))) {
        res.status(401).json({ error: 'Token not valid' })

        return
      }

      const dataSource = await initDatabase()
      const [, token] = req.headers.authorization.split(' ')
      const tokenBanned = await dataSource.getRepository(BannedTokenSchema).findOne({ where: { token } })

      if (tokenBanned) {
        res.status(400).json({ error: 'Token is invalid' })

        return
      }

      const { name, email, age, education, gender, responses } = req.body as FinanceGameModel

      if (!name || name.trim().length === 0) {
        res.status(400).json({ error: 'Name is required' })

        return
      }

      if (!email || email.trim().length === 0) {
        res.status(400).json({ error: 'Email is required' })

        return
      }

      if (!age || Number(age) < 18 || Number(age) > 120) {
        res.status(400).json({ error: 'Age is required' })

        return
      }

      if (!education || education.trim().length === 0) {
        res.status(400).json({ error: 'Education is required' })

        return
      }

      if (!gender || gender.trim().length === 0 || (gender !== 'male' && gender !== 'female' && gender !== 'unknown')) {
        res.status(400).json({ error: 'Gender is required' })

        return
      }

      if (!responses) {
        res.status(400).json({ error: 'Responses is required' })

        return
      }

      await dataSource.transaction(async (manager) => {
        await manager.getRepository(FinanceGameSchema).save({
          name,
          email,
          age,
          education,
          gender,
          responses: JSON.stringify(responses),
          createdAt: new Date()
        })

        await manager.getRepository(BannedTokenSchema).save({ token })
      })

      await dataSource.destroy()

      const transport = createTransport({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        host: String(process.env.MAIL_HOST),
        port: process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS
        }
      })

      const ses = new SES({
        credentials: {
          accessKeyId: process.env.FG_AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.FG_AWS_SECRET_ACCESS_KEY
        },
        region: process.env.FG_AWS_DEFAULT_REGION
      })

      await ses.sendEmail({
        Source: 'Jogo do Consumo <noreply@furlansoftware.com>',
        Destination: {
          ToAddresses: [`${name} <${email}>`]
        },
        Message: {
          Subject: { Data: 'Aqui está o seu desempenho no Jogo do Consumo.' },
          Body: {
            Html: {
              Data: `
                <!DOCTYPE html>
                <html lang="en">
                  <head>
                    <meta charset="UTF-8" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Jogo do Consumo</title>
                    <style>
                      html, body {
                        margin: 0 auto;
                        padding: 0 auto;
                        font-family: sans-serif;
                      }

                      table.finance-game-result {
                        width: fit-content;
                        font-family: sans-serif;
                        border-collapse: separate;
                        border-spacing: 0;
                      }

                      table.finance-game-result tr > * {
                        text-align: center;
                        border: 1px solid rgba(0,0,0, .5);
                      }


                      table.finance-game-result > thead > tr > th {
                        padding: 8px;
                        background: gray;
                      }

                      table.finance-game-result > thead > tr > th:first-child {
                        border-top-left-radius: 4px;
                      }

                      table.finance-game-result > thead > tr > th:last-child {
                        border-top-right-radius: 4px;
                      }

                      table.finance-game-result > tbody > tr:nth-child(odd) > td {
                        background: lightgray;
                      }

                      table.finance-game-result > tbody > tr > td {
                        padding: 8px;
                        border-left: 1px solid rgba(0,0,0, .5);
                        border-right: 1px solid rgba(0,0,0, .5);
                      }

                      table.finance-game-result > tbody > tr:last-child > td:first-child {
                        border-bottom-left-radius: 4px;
                      }

                      table.finance-game-result > tbody > tr:last-child > td:last-child {
                        border-bottom-right-radius: 4px;
                      }
                    </style>
                  </head>
                  <body>
                    <p>Obrigado por participar do Jogo do Consumo! Abaixo está o seu desempenho nas fases do jogo.</p>
                    <p>Lembrando que o jogo tem fins estritamente acadêmicos e que seus dados não serão compartilhados com ninguém.</p>
                    <table class="finance-game-result">
                      <thead>
                        <tr>
                          <th>FASE</th>
                          <th>PERÍODO</th>
                          <th>RENDA</th>
                          <th>DESPESAS FIXAS</th>
                          <th>DESPESAS COM QUALIDADE DE VIDA</th>
                          <th>POUPANÇA NO FINAL DO PERÍODO</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${(typeof responses === 'string' ? JSON.parse(responses) : responses).game
                          .map((l: GameResponse[], il) => {
                            return l
                              .map((entries, is) => {
                                return `
                                  <tr>
                                    <td>${il + 1}</td>
                                    <td>${is + 1}</td>
                                    <td>${entries.income}</td>
                                    <td>${entries.expenses}</td>
                                    <td>${entries.stageExpenses}</td>
                                    <td>${entries.savings}</td>
                                  </tr>
                                `
                              })
                              .join('\n')
                          })
                          .join('\n')}
                      </tbody>
                    </table>
                  </body>
                </html>
              `
            }
          }
        }
      })

      res.status(201).end()
    } else {
      res.status(405).end()
    }
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: e.message ?? 'Unexpected error occurred' })
  }
}
