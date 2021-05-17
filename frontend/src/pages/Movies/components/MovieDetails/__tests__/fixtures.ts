export const movieResponseWithoutReview = {
  "id": 5,
  "title": "Coringa",
  "subTitle": "Coloque um sorriso nessa cara.",
  "year": 2019,
  "imgUrl": "https://www.themoviedb.org/t/p/w533_and_h300_bestv2/n6bUvigpRFqSwmPp1m2YADdbRBc.jpg",
  "synopsis": "Arthur Fleck trabalha como palhaço para uma agência de talentos e, toda semana, precisa comparecer a uma agente social, devido aos seus conhecidos problemas mentais. Após ser demitido, Fleck reage mal à gozação de três homens em pleno metrô e os mata. Os assassinatos iniciam um movimento popular contra a elite de Gotham City, da qual Thomas Wayne é seu maior representante.",
  "genreId": 4,
  "reviews": []
}

export const movieResponseWithReview = {
  "id": 5,
  "title": "Coringa",
  "subTitle": "Coloque um sorriso nessa cara.",
  "year": 2019,
  "imgUrl": "https://www.themoviedb.org/t/p/w533_and_h300_bestv2/n6bUvigpRFqSwmPp1m2YADdbRBc.jpg",
  "synopsis": "Arthur Fleck trabalha como palhaço para uma agência de talentos e, toda semana, precisa comparecer a uma agente social, devido aos seus conhecidos problemas mentais. Após ser demitido, Fleck reage mal à gozação de três homens em pleno metrô e os mata. Os assassinatos iniciam um movimento popular contra a elite de Gotham City, da qual Thomas Wayne é seu maior representante.",
  "genreId": 4,
  "reviews": [
    {
      "id": 1,
      "text": "Gostei demais desse filme!!!",
      "movieId": 5,
      "user": {
        "id": 1,
        "name": "Lucas",
        "email": "lucas@gmail.com",
        "roles": [
          {
            "id": 2,
            "authority": "ROLE_MEMBER"
          }
        ]
      }
    },
    {
      "id": 2,
      "text": "Recomendo demais esse filme!!!",
      "movieId": 5,
      "user": {
        "id": 2,
        "name": "Bob Brown",
        "email": "bob@gmail.com",
        "roles": [
          {
            "id": 2,
            "authority": "ROLE_MEMBER"
          }
        ]
      }
    }
  ]
}