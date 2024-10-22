import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';  // Usei Row e Col para layout responsivo
import CardTarefaMateria from './CardTarefaMateria';
import Header from './Header'; // Certifique-se de ter o Header já implementado

function NotasProfessor() {
  const [data, setData] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:8080/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setData(json.message);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (data) {
      fetch(`http://localhost:8080/tasks/getalluser/null/${data._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((json) => {
          setTasks(json.tasks);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [data]);

  return (
    <>
      <Header />
      <div style={{ padding: '20px' }}>
        <Row gutter={[16, 16]}>
          {tasks.map((task) => (
            <Col xs={24} sm={12} md={8} lg={6} key={task._id}>
              <CardTarefaMateria
                title={task.title}
                professorName={task.professorName}
                professorImage={task.professorImage}
                subject={task.subject}
                status={task.status}
                button="Ver respostas"
                id={task._id}
              />
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default NotasProfessor;
