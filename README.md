# Executive Summary
Neonatal sepsis is blood infection that occurs in infant younger than 90 days old. Neonatal sepsis is one of the biggest cause of deaths in new-borns of which 83% happens in rural area. 

Main objective of this project is to identify key factors which help in assessing the probability of sepsis in neonatal babies before the blood culture report is received. This will help in unnecessary administration of antibiotics in babies. Only the babies with high probability of sepsis will be administered antibiotics and hence reducing antibiotic resistance in babies and further reduce mortality due to the same.

Predicting neonatal sepsis is a challenge which leads to administration of panic antibiotics leading to antibiotic resistance in babies. This project aims in using machine learning algorithms to extract the features which can help in predicting the risk of baby getting sepsis. 

# Approach

In order to train the machine learning algorithm, we've developed a data collection portal (coded in AngularJS). This portal is supported by a nodeJS API backend and finally the data is saved in MySQL database.

Training and predicting the probability of a baby having neonatal sepsis was done using in Python. Finally, we've also built a few interactive and intuitice reports and dashboards. We have prepared a separate front-end for the dashboards and feel these reports and charts will help the medical professionals look at case trends and draw more value out of the data.

# What you will find in this Repo

In this repository you will the code and also the data models for our solution.

# Folder structure

- 00_Database_Schema - Contains the schema definition
- 01_Web_Portal - Front End code (AngularJS)
- 02_Backend - Backend API code (NodeJS)
- 03_Dashboard_Backend - API for the Dashboards
- 04_Dashboard_Portal - Portal for the Dashboards
- 05_PredictionCode - Code for doing the predictions.
- 06_
