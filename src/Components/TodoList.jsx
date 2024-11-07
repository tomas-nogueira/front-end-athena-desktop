import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, TextField, Button, List, ListItem, Checkbox, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('dailyTasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('dailyTasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (taskInput.trim()) {
      const newTask = { id: Date.now(), text: taskInput, completed: false };
      setTasks([...tasks, newTask]);
      setTaskInput('');
    }
  };

  const handleToggleTask = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <Grid
      item
      xs={12}
      sm={5}
      sx={{
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 2,
        borderLeft: '5px solid #004FFF', // Borda lateral azul
      }}
    >
      <Typography
        sx={{
          textAlign: 'center',
          borderBottom: '2px solid #004FFF',
          color: 'black',
          fontWeight: 'bold',
          width: '50%',
          margin: '0 auto',
          padding: '8px 0',
          fontSize: 25,
        }}
      >
        TAREFAS DO DIA
      </Typography>
      <Box sx={{ marginTop: 2 }}>
        <TextField
          fullWidth
          label="Adicionar tarefa"
          variant="outlined"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <Button sx={{ marginTop: 2 }} variant="contained" color="primary" onClick={handleAddTask}>
          Adicionar
        </Button>

        <List sx={{ marginTop: 2 }}>
          {tasks.map((task) => (
            <ListItem key={task.id} sx={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox
                checked={task.completed}
                onChange={() => handleToggleTask(task.id)}
                color="primary"
              />
              <Typography
                sx={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                  flex: 1,
                }}
              >
                {task.text}
              </Typography>
              <IconButton onClick={() => handleDeleteTask(task.id)} color="error">
                <Delete />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Grid>
  );
}

export default TodoList;
