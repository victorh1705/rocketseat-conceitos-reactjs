import React, { useEffect, useState } from 'react'
import api from './services/api'
import './styles.css'

function App() {
    const [repositories, setRepositories] = useState([])

    useEffect(() => {
        api.get('/repositories').then((resp) => {
            setRepositories(resp.data)
        })
    }, [])

    async function handleAddRepository() {
        api.post('/repositories', {
            url: 'https://github.com/Rocketseat/umbriel',
            title: 'Umbriel',
            techs: ['Node', 'Express', 'TypeScript'],
        }).then((resp) => {
            setRepositories([...repositories, resp.data])
        })
    }

    async function handleRemoveRepository(id) {
        api.delete(`/repositories/${id}`).then((resp) => {
            setRepositories(repositories.filter((i) => i.id !== id))
        })
    }

    return (
        <div>
            <ul data-testid='repository-list'>
                {repositories.map((repository) => (
                    <li key={repositories.id}>
                        {repository.title}
                        <button onClick={() => handleRemoveRepository(repository.id)}>
                            Remover
                        </button>
                    </li>
                ))}
            </ul>

            <button onClick={handleAddRepository}>Adicionar</button>
        </div>
    )
}

export default App
