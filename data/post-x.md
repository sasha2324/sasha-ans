# Posts for X

The text of the draft posts that the GitHub Action puts in the issues
(`.github/workflows/draft-x-posts.yml`). It never posts on X: Sasha posts by hand.

How to write one:

- One section for each project. The title of the section is the repository name,
  exactly as on GitHub, after two hash signs (look at the sections below).
- The shape, from Dilum Sanjaya's posts on X: a first line with a problem or a question
  the reader knows; then "So I built…"; then one or two short facts; the link last.
- Write the post without the link: the script adds it at the end (the "Website" of the
  repository on GitHub, otherwise the project card on the site). If you write a link
  yourself, the script adds nothing.
- Max 280 characters. Every link counts as 23. No hashtags.

## carburanti-terni

Which day of the week is fuel cheapest in Terni?

I wanted to know. So I built a site that ranks every station, with a map and the price history of each one.

Built with Python and open data.

https://sasha2324.github.io/carburanti-terni/

## rapportino

Every month, someone has to collect everyone's work hours.

So I built an app for it. The owner sends one link. Employees log their hours on the phone and share an Excel file at the end of the month.

No account, no server. The data stays on the phone.

## sub4

A marathon under 4 hours means 5:41 per km, for 42.2 km.

So I built my own training tracker. It pulls my runs from Strava and Garmin, checks them against my plan and corrects my pace for hills.

Built with Python and Claude Code.
