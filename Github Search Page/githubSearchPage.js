const token = '';//token should be between the quotes but I have omited it for privacy

const fetchData = async () => {
    const username = document.getElementById('username').value;
    const userInfoDiv = document.getElementById('user-info');
    userInfoDiv.textContent = ''; 

    if (!username) {
        userInfoDiv.textContent = 'Please enter a username';
        return;
    }

    try {
        const response = await fetch(`https://api.github.com/users/${username}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.ok) {
            throw new Error('User not found');
        }

        const data = await response.json();
        displayInfo(data);
    } catch (error) {
        userInfoDiv.textContent = `Error: ${error.message}`;
    }
};

const displayInfo = (data) => {
    const userInfoDiv = document.getElementById('user-info');


    //display user image (profile picture)
    const avatar = document.createElement('img');
    avatar.src = data.avatar_url;
    avatar.width = 100;
    userInfoDiv.appendChild(avatar);

    //display username
    const username = document.createElement('p');
    username.textContent = `Username: ${data.login}`;
    userInfoDiv.appendChild(username);

        //display Name

    const name = document.createElement('p');
    name.textContent = `Name: ${data.name}`;
    userInfoDiv.appendChild(name);

        //display bio

    const bio = document.createElement('p');
    bio.textContent = `Bio: ${data.bio}`;
    userInfoDiv.appendChild(bio);


        //display location

    const location = document.createElement('p');
    location.textContent = `Location: ${data.location}`;
    userInfoDiv.appendChild(location);

        //display public repos

    const publicRepos = document.createElement('p');
    publicRepos.textContent = `Public Repos: ${data.public_repos}`;
    userInfoDiv.appendChild(publicRepos);

         //display followers

    const followers = document.createElement('p');
    followers.textContent = `Followers: ${data.followers}`;
    userInfoDiv.appendChild(followers);


        //display following

    const following = document.createElement('p');
    following.textContent = `Following: ${data.following}`;
    userInfoDiv.appendChild(following);

};

document.getElementById('username').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        fetchData();
    }
});

