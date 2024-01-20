import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import ItineraryPage from './itinerary/itinerary'
import ItineraryPage2 from './itinerary/itinerary2'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <ItineraryPage />
    </>
  )
}
