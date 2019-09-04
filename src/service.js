export const getDocuments = (filename = '') => {
  const query = filename ? `?filename=${filename}` : '';
  return fetch(`http://localhost:8000/documents${query}`).then(response =>
    response.json()
  );
};

export const createDocument = body =>
  fetch('http://localhost:8000/documents', {
    method: 'POST',
    body
  }).then(response => response.json());

export const deleteDocument = docId =>
  fetch(`http://localhost:8000/documents/${docId}`, { method: 'DELETE' }).then(
    response => response.json()
  );
