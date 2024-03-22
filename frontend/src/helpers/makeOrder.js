const makeOrderApi = async (orderId, items, email, accountData) => {
  try {
    const response = await fetch('http://localhost:3000/makeorder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId,
        items,
        email,
        accountData,
      }),
    });

    if (response.ok) {
      console.log('Solicitud POST enviada con éxito');
      return true;
    } else {
      console.error('Error al enviar la solicitud POST');
      return false;
    }
  } catch (error) {
    console.error('Error de red:', error);
    return false;
  }
};

export default makeOrderApi;
