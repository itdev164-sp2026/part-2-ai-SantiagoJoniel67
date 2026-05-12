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
 
 ## Activity 3: Server-Side Data with Supabase

### Prompt 1

**What I asked:**

> (Paste the prompt you used to generate the projects page)

Using the Supabase client at src/lib/supabase.ts, create a new Server Component
at src/app/projects/page.tsx that:

1. Fetches all records from the "projects" table in Supabase
2. Displays them in a professional layout using shadcn/ui Card components
   (run `npx shadcn@latest add card` if needed)
3. Each card should show the project title, description, and a status badge
4. The status badge should be color-coded:
   - "active" = green
   - "completed" = blue
   - "archived" = gray

Use @workspace context to match the styling of our existing Dashboard.
This must be a React Server Component (async function, no "use client").
Do NOT use useEffect or useState for data fetching.

**What happened:**

> (Did the Agent create a Server Component or a Client Component?
> Did it use async/await or useEffect? Did you have to correct it?)

The agent created the server component as requested, and now corrections were needed.
### Prompt 2

**What I asked:**

> (Paste breadcrumb prompt)

The breadcrumb in src/app/layout.tsx always shows "Overview" because the page
name is hardcoded. Extract the breadcrumb into its own client component at
src/components/breadcrumb-nav.tsx that uses usePathname() from next/navigation
to display the correct page name. Map "/" to "Overview", "/projects" to
"Projects", and "/settings" to "Settings". Keep "ITDEV-164" as the first
breadcrumb segment. Then update layout.tsx to use the new component.


**What happened:**

> (Describe the result and what you learned from the exchange)

The agent created the breadcrumb and pretty much it didn't change as much for when I ran in through copliot.
### Reflection

> How does fetching data on the server feel different from the useEffect
> pattern you used in Web Programming 1? What are the advantages you
> noticed? Did anything surprise you about how simple server-side
> data fetching is in the App Router?

Fetching data on the server(and without using an api endpoint) is a bit strange coming from a REST api background, but either it gave me straightfoward portion of what copliot did towards my file, and refactoring my errors towards adding client-side hooks for data fetching and updating.

## Activity 4: AI-Driven Forms & Validation

### Prompt 1

**What I asked:**

> (Paste the prompt you used to create the Zod schema)
Create a Zod validation schema in a new file src/lib/schemas.ts for a "Project"
with the following fields:

- title: string, minimum 3 characters, with a custom error message
  "Title must be at least 3 characters"
- description: string, minimum 10 characters, with a custom error message
  "Description must be at least 10 characters"
- status: enum with values "active", "completed", "archived"

Export the schema and also export the inferred TypeScript type using z.infer.


**What happened:**

> (Did the Agent create the schema correctly? Did it export both
> the schema and the inferred type?)
Yeah when I paste the corrective prompt for giving copliot that message of creating schema it ended up being a success and it added a New Project icon where I can give a project name and I can create it as well.

### Prompt 2

**What I asked:**

> (Paste the prompt you used to generate the form and Server Action)
Using the Zod schema from src/lib/schemas.ts, do the following:

1. Create a form component at src/components/project-form.tsx that:
   - Is a Client Component ("use client") because it uses react-hook-form hooks
   - Uses react-hook-form with the zodResolver from @hookform/resolvers for validation
   - Uses shadcn/ui Field, FieldLabel, and FieldError for field layout
   - Uses shadcn/ui Input for title, Textarea for description, and Select for status
   - Shows inline error messages under each field when validation fails
   - Has a "Create Project" submit button
   - Shows a sonner toast notification on successful submission

2. Create a Server Action at src/app/actions.ts that:
   - Has "use server" at the top of the file
   - Accepts the validated form data
   - Validates it again with the Zod schema (server-side validation)
   - Inserts the validated data into the Supabase "projects" table
   - Returns a success or error response

3. Create a new page at src/app/projects/new/page.tsx that renders
   the project form within the dashboard layout.

4. Add a "New Project" button to the existing projects page
   (src/app/projects/page.tsx) that links to /projects/new.

Use @workspace to match the existing project styling.

**What happened:**

> (How did the Agent handle creating multiple files? Did it connect
> the form submission to the Server Action correctly? Did it include
> server-side Zod validation?)

It connected perfectly the way I see I didn't any errors placed throughout the code so when it generated route.ts, and page.tsx it managed to operate nicely as well.

### Prompt 3 (if applicable)

**What I asked:**

> (Any follow-up prompt — fixing notifications, adding server-side
> validation, or correcting form field behavior)
I didn't need to fix anything so for me I just kept it how it operated towards not asking copilot to fix anything.

**What happened:**

> (Describe the result)
there was chances that page.tsx was being fixed and it did copilot just changed a text generating a New Project button towards the website when you can create a project.

### Reflection

> How does the Schema-First approach with Zod change the way you think
> about forms? How does it help prevent "junk data" from entering the
> database? Compare this to how you handled form validation in
> previous courses.
I think between knowing and testing how junk data works it ended be more interesting to see and operate with copilot and gave some proper files and change some of the lines but ended up being a success and nothing break as well which is really good as well.
## Activity 5: Securing the App with Supabase Auth

### Prompt 1

**What I asked:**

> (Paste the main prompt you used for the full auth implementation)
Implement a complete email/password authentication flow for this Next.js 15
App Router project using @supabase/ssr. Here is what I need:

SUPABASE CLIENTS: Create server-side Supabase client utilities in
src/lib/supabase/ that work correctly with Next.js cookies. I need
separate clients for Server Components, Server Actions, and Middleware.

LOGIN PAGE: Create a page at src/app/(auth)/login/page.tsx with a
shadcn/ui card-based login form. It should support both "Sign In"
and "Sign Up" (toggle between them or use tabs). Handle the auth
via Server Actions, not client-side fetch.

MIDDLEWARE: Create a middleware.ts file at src/middleware.ts (next to
the app directory — Next.js looks for middleware as a sibling of app)
that:

Refreshes the user's auth session on every request
Protects the /projects routes — redirect unauthenticated users to /login
Allows unauthenticated access to /login
Uses supabase.auth.getUser() (NOT getSession()) for verification
SIGN OUT: Add a "Sign Out" button to the existing sidebar component
(src/components/app-sidebar.tsx) that calls a Server Action to sign
the user out and redirect to /login. The button must only render
when an authenticated user is present — pass the user as a prop from
the root layout (which will need to fetch it via the server Supabase
client) and gate the Sign Out UI on that prop.

UPDATE DATA QUERIES: Modify the projects page and the create-project
Server Action to use the authenticated Supabase client so that RLS
policies filter data per user.

Use @workspace to understand the existing project structure. Do not remove
or break existing functionality — integrate auth around it.

**What happened:**

> (How many files did the Agent create or modify? Did it handle
> middleware, login page, sign out, and data scoping all in one pass?)
At the middleware wasn't functioning correctly but type in a text towards copilot and everything worked after that in the middleware.ts file.

### Prompt 2

**What I asked:**

> (Paste any follow-up — fixing the redirect after login, correcting
> getSession vs getUser, handling middleware route matching, etc.)
can you fix this issue error on src/lib/supabase/middleware.ts (5:18) @ createMiddlewareClient and everything went smoothly having to fix the page and switching between 2 emails which was dope in a way and creating one project between 2 emails.

**What happened:**

> (Describe the fix and what you learned)
What I learned that there was a sense of knowing which line it made a change of and what was deleted, and that helped me knew about the middleware.ts was missing an import of nextserver method and it helped a lot towards fixing an error.

### Reflection

> How did the Agent handle the creation of middleware.ts? Did you have
> to manually add files to the Working Set for context? What surprised
> you about how many files needed to change to add authentication?
> How does middleware-based auth compare to checking login status
> inside each page component?
It managed to gather all up each and every folder possible and ended up in a good result adding in sign-up/sign-in which in my opinion was successful towards the code where it made a big help where now you add in a new project and once it was executed it was shown what I named and describe it to be.
