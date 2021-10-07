const crypto = require("crypto");
crypto.createHash("sha512").update("pw1234").digest("base64"); // 9iSeOd1vv2qinR2UM5Aog5LmqBncF/oFeTTsPUjqwGoG3lG232280LqAScE7FR7HHe4K0gyedCN7iZDZl+NZaA==
crypto.createHash("sha512").update("pw1234").digest("hex"); // f6249e39dd6fbf6aa29d1d943390288392e6a819dc17fa057934ec3d48eac06a06de51b6df6dbcd0ba8049c13b151ec71dee0ad20c9e74237b8990d997e35968

const createSalt = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      if (err) reject(err);
      resolve(buf.toString("base64"));
    });
  })
};

const createCryptoPassword = async (plainPassword) => {
  const salt = await createSalt(); // salt 생성

  return new Promise((resolve, reject) => {
    crypto.pbkdf2(plainPassword, salt, 100000, 64, "sha512", (err, key) => {
      if (err) reject(err);
      resolve({ password: key.toString("base64"), salt });
    });
  })
};

const getCryptoPassword = (plainPassword, salt) => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(plainPassword, salt, 9999, 64, "sha512", (err, key) => {
      if (err) reject(err);
      resolve({ password: key.toString("base64"), salt });
    });
  })
};


const cryptoPassword = async () => {
  const { password, salt } = await createHashedPassword('pw1234');
  // 암호회된 비밀번호(password)와 salt 값을 모두 데이터베이스에 저장합니다.
  // 그래야 사용자가 로그인을 시도하면 
  console.log('password', password);
  console.log('salt', salt);
};


cryptoPassword();