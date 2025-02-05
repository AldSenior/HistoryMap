'use client'
const personalities = [
	{
		id: 1,
		name: "Ленин (Ульянов Владимир Ильич)",
		description: "Российский революционер и политик, основатель советского государства.",
		birthDate: "22 апреля 1870",
		deathDate: "21 января 1924",
		image: "https://avatars.mds.yandex.net/i?id=3a7cdec45d69b6d8d1a9bd50c31b33b854e3346c-4216017-images-thumbs&n=13",
		achievements: [
			"Основание РСФСР",
			"Руководство Октябрьской революцией",
			"Создание Коммунистического Интернационала"
		]
	},
	{
		id: 2,
		name: "Троцкий (Лев Давидович)",
		description: "Российский революционер, теоретик и политический деятель, один из лидеров Октябрьской революции.",
		birthDate: "7 ноября 1879",
		deathDate: "21 августа 1940",
		image: "https://avatars.mds.yandex.net/i?id=59db1a85f3ede0a8474db34b35d9ec8762f53b7f-8082760-images-thumbs&n=13",
		achievements: [
			"Организация Красной Армии",
			"Лидер мирового троцкизма",
			"Создание теории постоянной революции"
		]
	}
]

import dynamic from 'next/dynamic'

const PersonCard = dynamic(() => import('../components/PersonCard'), { ssr: false })

import { useEffect, useState } from 'react'

const PersonalityPage = () => {
	const [loaded, setLoaded] = useState(false)

	useEffect(() => {
		// Установка состояния загрузки в true после первого рендера
		setLoaded(true)
	}, [])

	if (!loaded) return <div className="text-center mt-20">Загрузка...</div>

	return (
		<div className="flex flex-col items-center py-10 bg-gray-100 min-h-screen">
			<h1 className="text-4xl font-bold mb-8">Личности эпохи</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4 max-w-6xl w-full">
				{personalities.map(person => (
					<PersonCard key={person.id} person={person} />
				))}
			</div>
		</div>
	)
}

export default PersonalityPage
