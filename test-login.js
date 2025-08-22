const fetch = require('node-fetch');

async function testLogin() {
  try {
    const response = await fetch('http://localhost:3001/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'Test123!',
      }),
    });

    const data = await response.json();
    console.log('Login response:', data);
    
    if (data.access_token) {
      console.log('✅ Login endpoint working correctly');
    } else {
      console.log('❌ Login failed');
    }
  } catch (error) {
    console.error('Error testing login:', error);
  }
}

testLogin();