'use server'

import prisma from '@repo/db'
import { revalidatePath } from 'next/cache'
import { AthleteFormData } from '@dashboard/players/components/athlete-form'

export const updateAthlete = async (id: number, data: AthleteFormData) => {
  await prisma.athlete.update({
    where: { id: id },
    data,
  })

  revalidatePath('/players')
}
