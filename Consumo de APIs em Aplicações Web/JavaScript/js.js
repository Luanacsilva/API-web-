document.getElementById('searchButton').addEventListener('click', () => {
    const query = document.getElementById('searchQuery').value.trim();
  
    if (query === "") {
      alert("Por favor, insira um termo de busca.");
      return;
    }
  
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
  
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro de rede: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const booksDisplay = document.getElementById('booksDisplay');
        booksDisplay.innerHTML = ''; // Limpa o conteúdo anterior
  
        if (data.items && data.items.length > 0) {
          data.items.slice(0, 5).forEach(book => {
            console.log(book)
            const bookInfo = book.volumeInfo;
            const bookElement = document.createElement('div');

            bookElement.className = "booksDisplay_item"
            
            bookElement.innerHTML = `
              <img src="${bookInfo.imageLinks.smallThumbnail || undefined}" />
              <div>
                <h2>${bookInfo.title || 'Título indisponível'}</h2>
                <p><strong>Autor:</strong> ${bookInfo.authors ? bookInfo.authors.join(', ') : 'Autor indisponível'}</p>
                <p><strong>Descrição:</strong> ${bookInfo.description ? bookInfo.description : 'Descrição indisponível'}</p>
                <a href="${bookInfo.infoLink}" target="_blank">Mais informações</a>
              </div>
            `;
            booksDisplay.appendChild(bookElement);
          });
        } else {
          booksDisplay.innerHTML = '<p>Nenhum livro encontrado para a busca.</p>';
        }
      })
      .catch(error => {
        console.error('Erro:', error);
        document.getElementById('booksDisplay').innerHTML = `<p>Erro ao buscar livros: ${error.message}</p>`;
      });
  });
  