export async function getToken(username: string, password: string) {
    // Connectez-vous au serveur et obtenez le token d'accès
    const response = await fetch('http://localhost:8080/api/inscription', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log("rep : " + response.bodyUsed)
  
    // Vérifiez la réponse du serveur
    if (response.status === 200) {
      const token = await response.json();
      console.log("token : " + token)

      return token.access_token;
    } else {
      // Il y a eu une erreur lors de la connexion
      throw new Error('Erreur lors de la connexion');
    }
  }
