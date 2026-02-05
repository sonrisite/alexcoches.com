function App() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh', 
      fontFamily: 'system-ui, sans-serif',
      backgroundColor: '#f3f4f6',
      color: '#1f2937',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛠️</h1>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Mantenimiento en curso</h1>
      <p style={{ fontSize: '1.25rem', color: '#4b5563', maxWidth: '500px' }}>
        Estamos realizando algunas mejoras en <strong>alexcoches.com</strong>. 
        Volveremos a estar en línea muy pronto.
      </p>
      <div style={{ marginTop: '2rem', fontSize: '0.875rem', color: '#9ca3af' }}>
        &copy; {new Date().getFullYear()} Alex Coches
      </div>
    </div>
  );
}

export default App;
