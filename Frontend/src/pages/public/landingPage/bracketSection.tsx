/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import MainBracket from '../../../components/brackets/mainBracket'

const BracketSection:React.FC<{matches:any,teams:any,bracketType:any}> = ({matches,teams,bracketType}) => {
  return (
    <section className='z-20 relative'>
        <div className='absolute w-full h-full z-40' />
      <MainBracket matches={matches} teams={teams} bracketType={bracketType}  />
    </section>
  )
}

export default BracketSection
