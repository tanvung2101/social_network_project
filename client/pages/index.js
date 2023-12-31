import {useContext} from 'react'
import { UserContext } from '../context'


const Home = () => {
  const [state, setState] = useContext(UserContext);
  return (
    <div className='container'>
        <div className='row'>
            <div className='col'>
              {JSON.stringify(state)}
                <h1 className='display-1 text-center py-5'>Home Page</h1>
            </div>
        </div>
    </div>
  )
}

export default Home