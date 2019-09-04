import React, { useState, useEffect } from 'react';
import { SearchInput, UploadButton, DocumentCard } from './components';
import { formatBytes, checkFilePath, checkFileSize } from './helpers';
import { deleteDocument, getDocuments, createDocument } from './service';

const App = () => {
  const [searchInput, setSearchInput] = useState('');
  const [documents, setDocuments] = useState([]);
  const [uploadError, setUploadError] = useState('');
  const totalSize = formatBytes(
    documents.reduce((total, doc) => total + doc.size, 0)
  );

  useEffect(() => {
    getDocuments().then(response => setDocuments(response.data));
    return () => {};
  }, []);

  const onUploadChange = item => {
    const formData = new FormData();
    const { files } = item.current;
    let checkAll = true;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!checkFilePath(file) || !checkFileSize(file)) {
        checkAll = false;
        break;
      }
      formData.append('file', file);
    }
    if (checkAll) {
      createDocument(formData).then(response => {
        const newDocuments = documents.concat(response.data);
        setDocuments(newDocuments);
      });
    } else {
      setUploadError('One or more files is in an incorrect format');
    }
  };

  const onSearchChange = e => {
    const { value } = e.target;
    setSearchInput(value);
    getDocuments(value).then(response => setDocuments(response.data));
  };

  const onDeleteClick = docId => {
    deleteDocument(docId).then(() => {
      const newDocuments = documents.filter(doc => doc.id !== docId);
      setDocuments(newDocuments);
    });
  };

  return (
    <div className="mx-auto" style={{ maxWidth: 960 }}>
      <header className="mx-4 md:mx-0 my-8 flex md:flex-row flex-col-reverse items-center justify-between">
        <SearchInput value={searchInput} onChange={onSearchChange} />
        <UploadButton id="app-upload" onChange={onUploadChange}>
          Upload
        </UploadButton>
      </header>
      {uploadError && <div className="my-2 text-red-500">{uploadError}</div>}
      <main className="m-4 md:mx-0">
        <div className="flex flex-wrap items-baseline justify-between">
          <h2 className="w-full md:w-auto">{documents.length} Documents</h2>
          <div>Total size: {totalSize}</div>
        </div>
        <div className="flex flex-wrap -mx-4">
          {documents.map(doc => (
            <div key={doc.id} className="w-full md:w-1/3">
              <DocumentCard
                name={doc.name}
                size={formatBytes(doc.size)}
                onDelete={() => onDeleteClick(doc.id)}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
