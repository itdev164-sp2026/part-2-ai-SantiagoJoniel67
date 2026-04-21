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


## Activity 2: Building the Dashboard Shell

### Prompt 1

**What I asked:**

> (Paste the main prompt you used to create the dashboard layout)
Using the shadcn sidebar components that are now in my src/components/ui/ folder,
create a professional, collapsible dashboard layout. It should include:

1. A sidebar (src/components/app-sidebar.tsx) with navigation links for:
   - Overview (use the Home icon from lucide-react)
   - Projects (use the FolderOpen icon)
   - Settings (use the Settings icon)

2. A top navigation area with breadcrumbs showing the current page.

3. A main content area that wraps the existing page content.

4. Update src/app/layout.tsx to use the new SidebarProvider and sidebar layout.

Important: Preserve the Developer Profile content from Activity 1 in
src/app/page.tsx — it should appear in the main content area of the new layout.
Keep the dark mode toggle working.


**What happened:**

> (Describe how the Agent handled multiple files. Did it create
> app-sidebar.tsx correctly? Did it modify layout.tsx as expected?)

The Agent created the sidebar/dashboard but it gave an error towards a file named tooltip.tsx and after that I had to ask copilot to fix the error and it was because I was missing a provider which was very different to what I have in my Instructor's code but it worked and everything.

### Prompt 2

**What I asked:**

> (Paste any follow-up prompt — maybe a responsive fix, a styling
> adjustment, or recovering from an Agent mistake)

All I asked copilot to type for me and fix was "can you fix this error on a message, Runtime Error.

**What happened:**

> (Describe the result. Did the Agent fix the issue on the first try?)

It was able to fix the issue but then it wrote some of the code differently then my Instructor did which still gave me representation result as the example shown from the recording but it was a little bit different inside the prompt code of file layout.tsx and tooltip.tsx

### Reflection

> Did the Agent accidentally delete or overwrite any of your Activity 1
> code? If so, how did you recover? (Copilot Edits has an "Undo" /
> "Revert" button — did you use it?) What did you learn about giving
> the Agent context about existing code you want to preserve?
 
 The Agent did not overwrite any existing code. However it did generate slightly different code in class than when I was preparing for class, which it was between hectic and good at the same time because I learned something at times.