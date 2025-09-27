import React from 'react'
import PersonIcon from "@mui/icons-material/Person";

function Update() {
  return (
    <div>
      <div className='flex flex-col items-center justify-center m-6'>
        <div className='shadow-xl w-24 h-24 rounded-full flex items-center justify-center'>
          <PersonIcon className='text-blue-400 ' style={{fontSize:"80px"}}/>
        </div>
        <p className='text-sm mt-3 text-blue-400 font-bold hover:cursor-pointer'>Update Profile Image</p>
      </div>
    </div>
  )
}

export default Update