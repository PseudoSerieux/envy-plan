export async function getTokenConnexion(email: string, password: string) {
  // Connexion au serveur pour obtenir le token d'accès
  const response = await fetch('http://localhost:8080/api/connexion', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 200) {
    const data = await response.json();
    const token = data?.token;

    if (token) {
      return token;
    } else {
      console.log("getTokenConnexion: Aucun token trouvé dans la réponse");
      throw new Error('Erreur lors de la connexion');
    }
  } else {
    // Il y a eu une erreur lors de la connexion
    console.log("getTokenConnexion erreur connexion : " + email, password)
    throw new Error('Erreur lors de la connexion');
  }
}