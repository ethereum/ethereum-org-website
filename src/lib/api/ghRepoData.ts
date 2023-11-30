import axios from 'axios'

export const ghRepoData = async (githubUrl: string) => {
  const split = githubUrl.split("/")
  const repoOwner = split[split.length - 2]
  const repoName = split[split.length - 1]
  const repoData = await axios.get(`https://api.github.com/repos/${repoOwner}/${repoName}`, { headers: { 'Authorization': `Bearer ${process.env.GITHUB_TOKEN_READ_ONLY}` }}) 
const languageData = await axios.get(`https://api.github.com/repos/${repoOwner}/${repoName}/languages`, { headers: { 'Authorization': `Bearer ${process.env.GITHUB_TOKEN_READ_ONLY}` }})
    return {
        starCount: repoData.data.stargazers_count,
        languages: Object.keys(languageData.data),
    }
}