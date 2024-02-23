# Assignments

**Q1.**
1. Make an account in https://hub.docker.com.
2. Build a docker image which just prints **hello class** and exits.
3. Try to minimize the size of this image as much as you can!
4. Push this image in dockerhub.
5. Write a bash script which builds+tags+pushes the image into the dockerhub. (Bonus: Make the tag increase the number everytime it's built)

**Q2.**
1. Pull this image `docker pull docker.io/redis:6.0-bookworm`.
2. Find out the commands used to create this image using the command `docker inspect`.
3. Scan the image and list out all the vulnerabilities that you find.
4. Export this image into `tar` format.

**Q3.**
1. Run the image that you downloaded previously.
2. Check the CPU and memory usage of the container.
3. Limit the CPU and memory usage to the amount that you see ideal for this container.

**Q4.**
1. Write a dockerfile to build the image for the 3-tier application that you developed in earlier assignments.
2. Your application should be accessible from the host system.
3. Write a bash script to spawn all these containers and make another script to kill those container.
4. Bonus: Make the data persist by using docker volumes in those containers.

**Q5.**
1. Convert the **answer** from Q4 into docker-compose equivalent implementation.
2. Running `docker-compose up` should bring all the services up.
3. Bonus: Add healthcheck in your API.
