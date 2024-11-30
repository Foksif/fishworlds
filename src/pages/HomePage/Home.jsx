import React, { useRef } from 'react'
import { WelcomeSection } from '../../components/HomeComponents/WelcomeSection/WelcomeSection'
import { VideoSection } from '../../components/HomeComponents/VideoSection/VideoSection'
import { AdvantageSection } from '../../components/HomeComponents/AdvantageSection/AdvantageSection'
import { ProhodkaSection } from '../../components/HomeComponents/ProhodkaSection/ProhodkaSection'
import { DonateSection } from '../../components/HomeComponents/DonateSection/DonateSection'

export const HomePage = () => {
	const prohodkaRef = useRef(null)

	const scrollToProhodka = () => {
		if (prohodkaRef.current) {
			prohodkaRef.current.scrollIntoView({ behavior: 'smooth' })
		}
	}

	return (
		<>
			<WelcomeSection scrollToProhodka={scrollToProhodka} />
			<VideoSection />
			<AdvantageSection />
			<ProhodkaSection ref={prohodkaRef} />
			<DonateSection />
		</>
	)
}
