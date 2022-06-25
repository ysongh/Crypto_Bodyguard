import React, { useEffect } from 'react'

function index({ cbContract }) {
  useEffect(() => {
    fetchBodyguard();
  }, [])
  
  const fetchBodyguard = async () => {
    // const totalNFTs = await cbContract.methods._nftIds().call()
    // console.log(totalNFTs)
    // let temp = [];
    // for(let i = 1; i < totalNFTs; i++){
    //   const data = await cbContract.methods.contractNFTList(i).call()
    //   console.log(data)
    // }
  }

  return (
    <div className='container'>
      
    </div>
  )
}

export default index