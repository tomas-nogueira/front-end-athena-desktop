// Loading.js
import React from 'react';
import { Spin, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Loading = () => {
  return (
    <div style={styles.container}>
      <Spin indicator={antIcon} />
      <Typography style={styles.text} variant="h6">Carregando...</Typography>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Ocupa toda a altura da tela
    backgroundColor: '#f0f2f5', // Cor de fundo suave
  },
  text: {
    marginTop: '1rem', // Espaço acima do texto
    fontSize: '1.5rem', // Tamanho do texto
    color: '#1890ff', // Cor do texto
  },
};

export default Loading;
