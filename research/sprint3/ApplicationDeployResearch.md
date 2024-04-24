**__Deploying Application Research__**

Research on the best way to deploy our application

**Update: Can now access docker container on VM, however database is still wip**

*Steps to replicate*

1. Connect to campus vpn
2. Go to [here](http://128.105.37.207:8080), this connects to our csl machine using it's IP and then targeting 8080 which is running our yahtzee-app
3. Database should be able to work -- currently only working on Docker branch (PUSHER WIP)

**NOTES and changes to replicate on CSL**

- Had to generate a new [compose file](https://git.doit.wisc.edu/cdis/cs/courses/cs506/sp2024/team/mondaywednesdaylecture/T_22/yahtzee/-/blob/docker/docker-compose.yml?ref_type=heads) and [Dockerfile](https://git.doit.wisc.edu/cdis/cs/courses/cs506/sp2024/team/mondaywednesdaylecture/T_22/yahtzee/-/blob/docker/Dockerfile?ref_type=heads)

- Had to change package.json npm start script to `next start -H 0.0.0.0`

- Had to change urls, all services needed urls changed to accomodate for service names from compose file, localhost becomes yahtzee-app, and hits it's accompanying production. For example, here is the new url in scoreService.ts: `const url = 'http://yahtzee-app:3000/api'`

- .env file is changed to `DATABASE_URL=mysql://root:yahtzee@db1:3306/yahtzee` as the service 'db1' is located on port 3306

**[Building & Deploying Application w/Next.js](https://nextjs.org/docs/pages/building-your-application/deploying)**
* Goes over the basics of the production build and gives multiple options to deploy
* Very helpful as it goes over 3 different ways to self host, most notably with Docker
* Short and concise yet very informative Docker walkthough that includes how to:
    * Install Docker
    * Build a container
    * Run the container
    * also gives you an example that you can follow

**[Building and Deploying App w/Docker](https://canvas.wisc.edu/courses/395497/pages/gitlab-csl-deployment?module_item_id=7148524)**

Need to deploy on VM to be able to access database. Two ways to deploy:

1. clone your repository on the VM and run the docker compose file, building directly on the VM
    * ssh into your VM
    ```
    ssh -L localhost:53316:localhost:53316 [username]@cs506-team-22.cs.wisc.edu
    ```
    * navigate to home directory
    ```
    cd ~
    ```
    * copy Gitlab Access Token (will refer to as GAT for rest of instructions)
    ```
    glpat-gr6cSxF86Cdqj-SFumsE
    ```
    * clone git repository
    ```
    git clone https://glpat-gr6cSxF86Cdqj-SFumsE@git.doit.wisc.edu/cdis/cs/courses/cs506/sp2024/team/mondaywednesdaylecture/T_22/yahtzee.git
    ```
    * enter in password (aka GAT)
    * cd into app and run your compose file using your file
    ```
    docker-compose up -d
    ```
    * pull the latest version of each of the images specified in the compose file
    ```
    docker-compose pull
    ```

2. use your CI/CD pipeline's saved images to deploy from your container registry (If you're deploying your application using Docker containers, you would typically pull the Docker image from the registry onto your VM and then run containers based on that image)
    * ssh into your VM
    ```
    ssh -L localhost:53316:localhost:53316 [username]
    ```
    * ensure Docker is installed and if not then install it
    ```
    docker --version
    ```
    * authenticate with the registry to pull Docker images from your container registry
    ``` 
    ddocker login registry.doit.wisc.edu -u <GAT> -p <GAT>
    ```
    * pull the Docker image from the container registry
    ```
    docker pull registry.doit.wisc.edu/<your_image_path>
    ```

**run the Docker container on your VM**
```
docker run -d -p 3000:3000 --name yahtzee_yahtzee-app yahtzee_yahtzee-app
```
* other docker commands:
    * see all the containers
    ```
    docker ps
    ```
    * start a container that's already running
    ```
    docker start yahtzee_yahtzee-app
    ```
    * stop and remove a container 
    ```
    docker stop yahtzee_yahtzee-app
    docker rm yahtzee_yahtzee-app
    ```
    * check container logs
    ```
    docker logs yahtzee_yahtzee-app
    ```



**[Websockets & Next.js](https://blog.logrocket.com/implementing-websocket-communication-next-js/)**
* Explains a popular websocket, Socket.io and how you can use Next.js with it
* Goes over the steps to creating and then connecting the websocket 
* Gives multiple examples and code to go off of
* Very informative and useful if we choose to go down this route
