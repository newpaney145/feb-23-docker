Q1. 
![image](https://github.com/LF-DevOps-Training/feb-23-docker-mahesh-regmi-newpaney145/assets/42377140/41423d88-363e-43c6-9d29-9dcef21b05ad)

![image](https://github.com/LF-DevOps-Training/feb-23-docker-mahesh-regmi-newpaney145/assets/42377140/c1e4e1f4-5e81-4e4a-8d30-ec9e92c9dcf9)

- Above image shows docker user-name in web interface and logged in using docker command in own machine for image fetching pull operation.

![image](https://github.com/LF-DevOps-Training/feb-23-docker-mahesh-regmi-newpaney145/assets/42377140/755f18d0-bebe-4221-9d3e-44d7101694d5)


![image](https://github.com/LF-DevOps-Training/feb-23-docker-mahesh-regmi-newpaney145/assets/42377140/06a74129-d972-4eb8-bc97-de288607046a)

Above image present creation of lightweight docker image:
- `Alpine` which is a lightweight image with less size is used as base image
- Printing hello world we use `cmd` which execute command in runtime.
- The image is pushed in the dockerhub registry.


![image](https://github.com/LF-DevOps-Training/feb-23-docker-mahesh-regmi-newpaney145/assets/42377140/08050828-2bc8-4979-916e-f2e2a1280c4f)



![image](https://github.com/LF-DevOps-Training/feb-23-docker-mahesh-regmi-newpaney145/assets/42377140/58b91b4d-2d9a-4b37-b6dc-725ca7e91be6)

The above images shows the image being pushed and version control.
<br>
The later image view the command executed to build tag and push the images in the remote dockerhub repository.
<br>
For more secure, environment variable is used so preventing the hardcoding of credentials in script


Q.2

## REDIS PULL AND IMAGE SCANNING
To pull redis:6.0-bookworm, below command is executed
`docker pull redis:6.0-bookworm`

![image](https://github.com/LF-DevOps-Training/feb-23-docker-mahesh-regmi-newpaney145/assets/42377140/17bb8b76-2359-4820-96bd-dabf9a7e09a9)


For security scanning identifying vulnerabilities, i went with multiple tools for examing true-positive vulnerabilites if matching are discovered in both tools. For report i use snyk, which require authentication which can be done using snyk::



![image](https://github.com/LF-DevOps-Training/feb-23-docker-mahesh-regmi-newpaney145/assets/42377140/3c240d0b-40c9-44a5-b18c-c22b29e8af7f)


Output json is converted to html, using another package called synk-to-html.
![image](https://github.com/LF-DevOps-Training/feb-23-docker-mahesh-regmi-newpaney145/assets/42377140/ea22044d-09be-4cde-bb4b-3750e4c56542)



For presenting it to browser, i created a python server on port  9090 as well allowing firewall for external host access to that port.
![image](https://github.com/LF-DevOps-Training/feb-23-docker-mahesh-regmi-newpaney145/assets/42377140/d0eaf589-53f6-4034-ace6-0f01f93ccda6)

This shows clean human readable vulnerabilities that are available within `redis` image.
![image](https://github.com/LF-DevOps-Training/feb-23-docker-mahesh-regmi-newpaney145/assets/42377140/9c7e5cdd-11b3-453d-a35e-4531b79164f9)

The status of docker container briefing the memory usage or cpu resource it consuming can be shown below using 
<br>
`docker stats redis_docker`
![image](https://github.com/LF-DevOps-Training/feb-23-docker-mahesh-regmi-newpaney145/assets/42377140/c704384c-9f37-467f-942b-ac132ddd0cee)

Image below define fluctate in cpu resource usage and mem usage::
![image](https://github.com/LF-DevOps-Training/feb-23-docker-mahesh-regmi-newpaney145/assets/42377140/36215434-a47c-4c1f-a053-a062a919b5c6)

To restrict the container memory usage as well cpu resource we can update the container or else we can create a container with limited memory usage during spun up first time::
![image](https://github.com/LF-DevOps-Training/feb-23-docker-mahesh-regmi-newpaney145/assets/42377140/7401984c-5307-4515-b05a-396dcaadc170)

AS in image below you can view, the memory rising upto 512mb as well cpu changes.
![image](https://github.com/LF-DevOps-Training/feb-23-docker-mahesh-regmi-newpaney145/assets/42377140/9d28f126-d8db-49c3-9462-383503e1946d)


Q4.  TO BUILD IMAGE FROM DOCKERFILE

Each Dockerfile for frontend, Backend & Postgres are created and images are listed below:

![image](https://github.com/LF-DevOps-Training/feb-23-docker-mahesh-regmi-newpaney145/assets/42377140/7dd0a9e9-88c1-4c1d-92f4-e11c01ae25e7)

![image](https://github.com/LF-DevOps-Training/feb-23-docker-mahesh-regmi-newpaney145/assets/42377140/a80faaea-fa09-427e-976d-3b13740f7cda)


![image](https://github.com/LF-DevOps-Training/feb-23-docker-mahesh-regmi-newpaney145/assets/42377140/f6ead14a-6117-41f6-bb1a-63b7e6b193ca)

In above snapshot, each layers has different meaning:
<br>
`FROM` -- Import Base image layer from node
<br>
`WORKDIR /app`    -- create a directory and change to that directory
<br>
`COPY`            -- copy necessary dependencies and application to container filesystem
<br>
`EXPOSE`          -- port opening
<br>
`CMD`             -- execute in runtime


## Making a connection from host to container

![image](https://github.com/LF-DevOps-Training/feb-23-docker-mahesh-regmi-newpaney145/assets/42377140/f12650c0-172d-4fd2-8008-d1110cb8fcdd)
- In above image, the access to application is done from Host machine (containers were setup inside virtual machine).
- The running containers were displayed and the `curl` command is executed to check the connection.



![image](https://github.com/LF-DevOps-Training/feb-23-docker-mahesh-regmi-newpaney145/assets/42377140/b161056d-c944-4286-b11d-d22f36038a2b)

- The application logic server is hosted in a container at port 3001 which is made accessible via host port 3005.
- Using the endpoint, request methods are done to add delete or list the records in database.
- The database server is accessed which is running as container and via psql utility data record is checked based on the request method coming from application logic.
- We set the database and application server to exist on the same docker network so communication is done from each other and avoiding expose of database to outer hosts or external network.
- Required connection settings is added as environment variable while running container or adding .env file in nodejs application server `/app` directory.

![image](https://github.com/LF-DevOps-Training/feb-23-docker-mahesh-regmi-newpaney145/assets/42377140/affd2da3-1a2d-4299-be2b-74513f570975)

For spawning all containers at all, i used above logic to build as well to spun up all the containers.
- Using 'docker volume create' to mount given directory to the container given directory.
- `tag` is done so it can easy to perform version control after each application code refactoring.


![image](https://github.com/LF-DevOps-Training/feb-23-docker-mahesh-regmi-newpaney145/assets/42377140/74c0b46d-dc4b-47c8-970b-7d2abd4f0c24)
- For data persistence, which is needed if incase our process stop or memory overhead result container stops, we mount `/var/lib/docker/volumes/datadb/_data` to container `/var/lib/postgresql/data/test_volume_persist`

  Q5.
   

Below is the image that presents docker-compose to spawn up multiple application services
  ![image](https://github.com/LF-DevOps-Training/feb-23-docker-mahesh-regmi-newpaney145/assets/42377140/34676f24-8ffc-442f-8aba-93a202c35195)

In above image:
<br>
`services` define application service to run up.
<br>
`build` keyword to build out from dockerfile
<br>
`ports` exposing host port with container port
<br>
`environment` this define needed connecting settings or configuration when application boot up.
<br>
`volumes` define for persistent storage
<br>

Running docker-compose
Docker-compose can identify the file if the naming of file is `docker-compose.yml` otherwise flag need to be set to pass for custom naming file

command to execute docker-compose:: `docker-compose up`
> The file 'docker-compose.yml' should be on the same directory where command is being executed.


