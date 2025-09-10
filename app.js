@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

body {
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(135deg, #e0f7fa, #a7ffeb);
  margin: 0;
  padding: 0;
  color: #333;
}

.container {
  max-width: 600px;
  margin: 2rem auto;
  background: #ffffffcc;
  padding: 2.5rem 3rem;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
}

header {
  text-align: center;
  margin-bottom: 2rem;
}

header h1 {
  font-weight: 700;
  font-size: 2.4rem;
  margin-bottom: 0.3rem;
}

header p {
  font-weight: 400;
  font-size: 1.1rem;
  color: #00796b;
}

form label,
form legend {
  font-weight: 600;
  display: block;
  margin-top: 1.4rem;
  margin-bottom: 0.5rem;
  font-size: 1.05rem;
}

input[type="text"],
input[type="number"],
input[type="email"],
input[type="tel"],
textarea {
  width: 100%;
  padding: 0.7rem 1rem;
  border: 2px solid #b2dfdb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

input[type="text"]:focus,
input[type="number"]:focus,
input[type="email"]:focus,
input[type="tel"]:focus,
textarea:focus {
  border-color: #00796b;
  outline: none;
  background: #e0f2f1;
}

fieldset {
  border: 2px solid #b2dfdb;
  border-radius: 10px;
  padding: 1rem 1.25rem 1.5rem;
  margin-top: 1.4rem;
  background: #f1f8f7;
}

fieldset label {
  display: inline-block;
  margin-right: 1.3rem;
  cursor: pointer;
}

button {
  margin-top: 2rem;
  padding: 0.9rem 2.5rem;
  background: #00796b;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 600;
  box-shadow: 0 6px 15px rgba(0,121,107,0.4);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  display: block;
  width: 100%;
}

button:hover {
  background: #004d40;
  box-shadow: 0 8px 18px rgba(0,77,64,0.6);
}

.hidden {
  display: none;
  margin-top: 1rem;
  color: #2e7d32;
  font-weight: 700;
  text-align: center;
}
