import React from 'react'
import { UserScore } from '../component/userscore'
import "../../styles/Ranking.css"


export const Ranking = () => {
  return (
    <>
    <div className='ranking-img-header'>
        <img src="Winners_cuate.png" style={{width:'150px'}}/>        
    </div>
    <div className='ranking-box'>
        
            <UserScore />
            <UserScore />
            <UserScore />
            <UserScore />
            <UserScore />
            <UserScore />
            <UserScore />
            <UserScore />
            <UserScore />
            <UserScore />
            <UserScore />
            <UserScore />
    </div>
    </>
  )
}
