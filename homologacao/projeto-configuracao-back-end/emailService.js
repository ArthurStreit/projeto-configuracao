const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 587,
  auth: {
    user: 'USUARIO_AQUI',
    pass: 'SENHA_AQUI'
  }
})

async function enviarEmail(destinatario, assunto, mensagem) {
  await transporter.sendMail({
    from: '"Gerenciador de Tarefas" <no-reply@tarefas.com>',
    to: destinatario,
    subject: assunto,
    html: mensagem
  })
}

module.exports = { enviarEmail }
