# Prompting Log — ITDEV-164

## Activity 1: The AI-Native Launchpad

### Prompt 1
**What I asked:**

> Look at my project structure and tell me:

What framework and version am I using?
What styling solution is configured?
What components exist so far?
Then add a small "Setup verified ✓" badge to the bottom of the home page.


**What happened:**

The agent correctly identified Next.js Taiwind, postcss, and existing components. It also added the setup verified badge.
### Prompt 2

**What I asked:**

> Look at the existing src/app/page.tsx and src/app/layout.tsx in this project.
> Replace the current homepage content with a "Developer Profile" page for me.
> It should include:
- My name: Joniel Santiago
- A short bio (1-2 sentences about being a web development student)
- A "Skills" section that displays at least 6 skills in a responsive
  Tailwind CSS grid (use cards with icons from lucide-react)

Keep the existing Header component and layout structure intact.
If you need to create new components, go ahead and create them in
the src/components/ folder.

**What happened:**

> The agent completed the tasks without error or need for follow-up.
### Reflection
> Write 2-3 sentences reflecting on the experience. How did it feel
> to direct an AI to build something for you? What surprised you?
> What would you do differently next time?

Although I enjoy thinking through the development process and typing the code myself,
I feel that directing an AI to help me think through the development process and generate the desired code was a satisfying experience overall.

I was also very surpise and interesting that it can generate all code from very much putting what kind of message you type and it goes right towards your folder or file which is very cool to see you know.
