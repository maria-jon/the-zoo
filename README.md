# The Zoo

This project was done as a front-end school assigment for Medieinstitutet Sweden. 

Assignment was to build a website in React for a zoo, fetching the animals from an API. 

## Table of Contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Screenshots](#screenshots)
- [Acknowledgements](#acknowledgements)
- [Authors](#authors)

## Features

- Routing with start page, animal overview, as well as a separate page for the animals
- Animals are fetched from an API, and then any modifications are saved to localStorage
- Animal overview displays all animals and shows some info, including information on when they last were fed
- If an animal hasn't been fed in 3 hours, a notice about this is shown. If it hasn't been fed in 5 hours, another notice telling you to feed it now is shown
- Individual animal pages displays all info, as well as a button to feed animal. If animal has been fed in the last 4 hours, button is disabled
- A notice is shown if the animal hasn't been fed in the last 3 hours
- Some animal photos are missing, and these are replaced with a placeholder image

## Tech Stack

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)

- Vite version 6.3.5
- TypeScript version 5.8.3
- Tailwind version 4.1.12
- React version 19.1.0
- ESLint version 9.25.0
- Axios version 1.11.0

## Screenshots

![Hunger](/public/screenshots/Hunger.png)

## Acknowledgements

- [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)

## Authors

- [@maria-jon](https://www.github.com/maria-jon)