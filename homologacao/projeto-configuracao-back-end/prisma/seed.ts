import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const senhaCriptografada = await bcrypt.hash('a', 10)

  const usuario = await prisma.usuario.upsert({
    where: { email: 'homologacao@teste.com' },
    update: {},
    create: {
      nome: 'Usuário Homologação',
      email: 'homologacao@teste.com',
      senha: senhaCriptografada,
    },
  })

  console.log('Usuário criado:', usuario)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
