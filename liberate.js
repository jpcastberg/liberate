const { exec } = require('child_process');

const username = '' // Your Github Username
const password = '' // Your Github Password
const cohort = '' // Your Cohort (example: 'hrsf111')

const repoCanBeLiberated = (repo) => {
  return repo.name.includes(cohort) &&
  !repo.name.includes('self-assessment') &&
  !repo.name.includes('capstone');
}

exec(`curl -u "${username}:${password}" https://api.github.com/user/repos?affiliation=owner`, (err, repoData) => {
  if (err) return console.error(err);
  const repos = JSON.parse(repoData);
  const repoNames = repos.reduce((acc, repo) => {
    if (repoCanBeLiberated(repo)) {
      acc += repo.name + ' ';
    }
    return acc;
  }, '').trim();
  exec(`liberate --hackreactor ${repoNames}`, (err, output) => {
    if (err) return console.error(err);
    console.log(output);
  })
});
