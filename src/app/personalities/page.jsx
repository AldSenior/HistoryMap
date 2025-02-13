'use client'
import { personalities } from './personalities'

import dynamic from 'next/dynamic'

const PersonCard = dynamic(() => import('../components/PersonCard'), { ssr: false })

import { useEffect, useState } from 'react'

const PersonalityPage = () => {
	const [loaded, setLoaded] = useState(false)

	useEffect(() => {
		setLoaded(true)
	}, [])

	if (!loaded) return <div className="text-center mt-20">Загрузка...</div>

	return (
		<div className="flex flex-col items-center py-10 bg-gray-100 min-h-screen">
			<h1 className="text-4xl font-bold mb-8">Личности эпохи</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 px-4 max-w-5xl w-full">
				{personalities.map((person) => (
					<PersonCard key={person.id} person={person} />
				))}
			</div>
		</div>
	)
}

export default PersonalityPage
