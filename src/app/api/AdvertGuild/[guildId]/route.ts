import actionOnRequest from '@/lib/actionOnRequest'
import prisma from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { guildId: string } }) {
	const guildId = params.guildId
	return actionOnRequest(request, async () => {
		return await prisma.advertGuild.findUnique({
			where: {
				id: guildId,
			},
		})
	})
}

export async function POST(request: Request, { params }: { params: { guildId: string } }) {
	const guildId = params.guildId
	return actionOnRequest(request, async body => {
		return await prisma.advertGuild.update({
			where: {
				id: guildId,
			},
			data: {
				users: {
					connectOrCreate: {
						where: { id: 'member.user.id' },
						create: { id: 'member.user.id', name: 'member.user.username' },
					},
				},
			},
		})
	})
}

export async function DELETE(request: Request, { params }: { params: { guildId: string } }) {
	const guildId = params.guildId
	return actionOnRequest(request, async () => {
		return await prisma.advertGuild.delete({
			where: {
				id: guildId,
			},
		})
	})
}
