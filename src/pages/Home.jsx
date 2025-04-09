import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import HeroSection from '../components/HeroSection/HeroSection'
import Profile from './Profile'
import { Routes, Route } from 'react-router-dom'

const Home = () => {
  return (
    <>
    <Navbar />
    <HeroSection />
    </>
  )
}

export default Home
