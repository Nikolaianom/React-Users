import React, { useEffect, useState } from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = useState([])
  const [invites, setInvites] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [success, setSucces] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const onClickInvite = (id) => {
    if(invites.includes(id)){
      setInvites(prev => prev.filter(_id => _id != id))
    } else {
      setInvites(prev => [...prev, id])
    }
  }
  const onClickSendInvites = () => {
    setSucces(true)
  }
  useEffect(() => {
    fetch('https://reqres.in/api/users').then(res => res.json())
    .then(json => {
      setUsers(json.data)
    }).catch(err => {
      console.warn(err);
      alert('Ошибка при получении пользователей')
    }).finally(() => setIsLoading(false))
  }, [])

  const onChangeSearchValue = (e) => {
    setSearchValue(e.target.value)
  }
  return (
    <div className="App">
      {
        success ? (
          <Success count={invites.length} />
        ) : (<Users items={users}
          isLoading={isLoading}
          searchValue={searchValue}
          onChangeSearchValue={onChangeSearchValue}
          invites={invites}
          onClickInvite={onClickInvite}
          onClickSendInvites={onClickSendInvites} />)
      }
      
    </div>
  );
}

export default App;
