# Prompting Log — ITDEV-164

## Activity 1: The AI-Native Launchpad

### Prompt 1
**What I asked:**
> Look at the existing src/app/page.tsx and src/app/layout.tsx in this project.
>Replace the current homepage content with a "Developer Profile" page for me.
>It should include:

>My name: [Your Name]
>A short bio (1-2 sentences about being a web development student)
>A "Skills" section that displays at least 6 skills in a responsive
>Tailwind CSS grid (use cards with icons from lucide-react)
>Keep the existing Header component and layout structure intact.
>If you need to create new components, go ahead and create them in
the src/components/ folder.



**What happened:**
> I noticed how the agent changed the content right away. Once ite finished applying the changes, it also prompted me to give it my name and 6 skills so it could update my profile.

### Prompt 2
**What I asked:**
> Yes, my name is Marco Giovanni Flores Hernandez

Skills: CSS,HTML,Javascript, Git, SQl, C++

**What happened:**
> As soon as I gave it my response, it applied it quickly and got updated on the server as well.

### Reflection
> It actually felt pretty good being able to see what changes the AI did to the code, and the fact that you have the option of keeping the changes or revert them, makes it more secure to use for projects.


## Activity 2: Building the Dashboard Shell

### Prompt 1
**What I asked:**
> Using the shadcn sidebar components that are in my project, create a collapsible dashboard layout. Include a sidebar with navigation links (Overview, Projects, Settings), a top navigation with breadcrumbs, and a main content area. Also update layout.tsx to use the sidebar layout. Keep my Developer Profile page and dark mode working.

**What happened:**
> The Agent handled the task step by step. First, it checked my existing layout and components to understand the project. Then it created the sidebar and connected it to the layout. It also added navigation links using icons from lucide-react and built a top navigation area with breadcrumbs.

>It updated layout.tsx to use the new sidebar system and wrapped the existing page content inside the main content area. My Developer >Profile from Activity 1 was still there, which means it followed the instruction to preserve it. The dark mode toggle also continued to work.

>Overall, the Agent worked carefully and made changes across multiple files without breaking the app.

### Prompt 2
**What I asked:**
> Does the sidebar use the Shadcn Sidebar components (not a custom div)?
>Are the icons imported from lucide-react?
>Is the Developer Profile content still intact?
>Does the layout use SidebarProvider and SidebarInset correctly?


>Are these met after you made adjustemenets to the files?

**What happened:**
> Yes, all the requirements were met after the Agent made changes.

>The sidebar is built using the Shadcn components from shadcn/ui, not just a custom div. It uses the proper sidebar structure like Sidebar and SidebarMenu.

>The icons are correctly imported from lucide-react and used for the navigation links.

>My Developer Profile content from Activity 1 is still intact in page.tsx, so nothing important was deleted or overwritten.

>The layout also correctly uses SidebarProvider and SidebarInset, which means the sidebar and main content are connected properly.

>Overall, everything works as expected and the Agent followed all the instructions correctly.

### Reflection
> Did the Agent accidentally delete or overwrite any of your Activity 1
> code? If so, how did you recover? (Copilot Edits has an "Undo" /
> "Revert" button — did you use it?) What did you learn about giving
> the Agent context about existing code you want to preserve?

>I didn't see agent overwriting anything related to Activity 1. The Changes that he made were mainly focused on today's activity. However, I was still checking that nothing got changed.
>Besides of that, I didn't have to use the revert button.
>I learned that giving the right commands and being specific as to what files are you lookingto get changed, the agent will do the work. Also, I like the fact that he also explains the process that he does in order to make the changes.

## Activity 3: Server-Side Data with Supabase

### Prompt 1

**What I asked:**

> I will quickly verify the current Projects page and Card component files so I can confirm each checklist item against what is actually in your workspace.

**What happened:**

> Copilot checked the Projects page and confirmed that it was using the correct async Server Component pattern. It said the page exported an async component and fetched data with await directly in src/app/projects/page.tsx. It also confirmed there was no "use client", and that there was no useEffect or useState being used for data fetching.

>I also asked about the card component requirement. Copilot explained that it could not fully use the shadcn CLI the normal way because the CLI opened an interactive setup instead of directly adding the component. So it manually added a shadcn-style Card component and used it in the projects page.

>I also asked whether there would be a problem if the code did not look exactly like the example. 

>Copilot said that was not a problem because that snippet was just the minimal pattern, and my code still followed the correct Server Component approach.

>So basically, it made the page as a Server Component, used async/await, and did not use the old client-side useEffect style. I did not have to correct that part, which was honestly nice for once.

### Prompt 2

**What I asked:**

> I can fix that by restoring toggle behavior: I will re-enable a collapsible sidebar on desktop and bring back the top-left trigger so it also works as the burger button on mobile.

**What happened:**

> Copilot found the reason the sidebar controls disappeared. It said the sidebar had been set to non-collapsible and the trigger button had been removed from the header. Then it updated two files to fix it:

>src/components/app-sidebar.tsx
>src/app/layout.tsx

>It restored the collapsible sidebar, added the trigger button back, and explained that:

>on desktop, the button hides and shows the sidebar
>on mobile, the same button works as the burger menu

>It also mentioned there was one unrelated TypeScript warning, but that it was not caused by the sidebar fix.

>From that exchange, I learned that Copilot was pretty decent at explaining what it changed and why. It did not just throw code at me. It actually told me what broke, what files it changed, and what I should test after. That made it easier to follow along instead of just hoping the fix worked.

### Reflection

> Fetching data on the server feels a lot different from the useEffect pattern I used in Web Programming 1. With useEffect, I had to make a client component, set up useState, load the data after render, and usually deal with loading states and extra boilerplate. With the App Router server-side approach, the page can just be async and fetch the data directly before rendering, which feels way cleaner.

>One big advantage I noticed is that the code is simpler. There is less setup, less repeated logic, and it is easier to read. Another advantage is that the page is already rendered with data instead of waiting for the browser to fetch it after the page loads. That just feels more modern and less clunky.


## Activity 4: AI-Driven Forms & Validation

### Prompt 1

**What I asked:**

> Create a Zod validation schema in a new file src/lib/schemas.ts for a “Project” with the fields title, description, and status. The title needed a minimum of 3 characters, the description needed a minimum of 10 characters, and status had to be an enum with "Planning", "Active", and "Completed". I also asked Copilot to export both the schema and the inferred TypeScript type using z.infer.

**What happened:**

> Copilot created the schema correctly in src/lib/schemas.ts. It used named exports, created projectSchema, added the custom error messages, and exported the inferred Project type using z.infer<typeof projectSchema>.

### Prompt 2

**What I asked:**

> Using the Zod schema from src/lib/schemas.ts, create a professional project form component, a Server Action, and a new page. The form needed to use react-hook-form, the Zod resolver, shadcn/ui components, inline errors, and toast notifications. The Server Action needed "use server", server-side Zod validation, and a Supabase insert into the projects table. The new page needed to render the form at src/app/projects/new/page.tsx.

**What happened:**

> Copilot created and modified several files, including src/components/project-form.tsx, src/app/actions.ts, and src/app/projects/new/page.tsx. It also added supporting UI files like form.tsx, textarea.tsx, label.tsx, and sonner.tsx. The form was connected to the Server Action correctly, used client-side Zod validation, displayed inline errors, and showed toast messages. The Server Action also re-validated the data with projectSchema.safeParse() before inserting into Supabase.

### Prompt 3 (if applicable)

**What I asked:**

> I asked Copilot to help fix the error: new row violates row-level security policy for table "projects". I also asked how to add the Supabase service role key to .env.local.

**What happened:**

> Copilot found that the Server Action was still using the public Supabase client from src/lib/supabase.ts, which uses the public publishable key and is affected by Row Level Security. It updated src/app/actions.ts to use a server-only Supabase client with SUPABASE_SERVICE_ROLE_KEY. It also added the SUPABASE_SERVICE_ROLE_KEY= line to .env.local. After that, I needed to paste the real service role key, save the file, and restart the dev server.

### Reflection

> The Schema-First approach with Zod makes forms feel more organized because the validation rules are written in one central place first. Instead of writing separate rules for the frontend and backend, the same schema can be reused for the form and the Server Action. This helps keep the form data consistent.

>It also helps prevent junk data from entering the database because the form validates the data before submission, and the Server Action validates it again before inserting into Supabase. This means even if someone bypasses the browser form, invalid data like a short title, short description, or wrong status value should still be rejected on the server.

>In previous courses, I usually handled validation manually with conditional statements or only checked the form on the client side. With Zod, the rules are clearer, reusable, and tied directly to TypeScript types. If the schema changes, the inferred type updates automatically, which reduces mistakes between the form, server action, and database insert.

## Activity 5: Securing the App with Supabase Auth

### Prompt 1

**What I asked:**

> I asked the Agent to replace the old browser-only Supabase setup with a full SSR-safe authentication flow using Supabase Auth. The request included creating middleware, adding login/sign-up and sign-out functionality, protecting the dashboard routes, switching to authenticated server-side clients, and updating project queries/actions so they worked with authenticated users and row-level security.

**What happened:**

> The Agent modified a large number of files across the app in one pass. It created new SSR-safe Supabase helper files, middleware utilities, and a new login route, while also updating the root layout, sidebar, server actions, and project query pages. It handled middleware, login/sign-up flow, sign out, protected routing, and authenticated data access together instead of treating them as separate features. It also removed the old browser-only Supabase client and rewired the app around cookie-aware authentication.
### Prompt 2

**What I asked:**

> I followed up by asking the Agent to verify the middleware authentication logic and investigate inconsistent sidebar behavior between normal and incognito windows. I specifically wanted to confirm whether the middleware was using getSession() or the more secure getUser() flow, and then debug why the sidebar appeared differently across sessions.

**What happened:**

> The Agent checked the middleware implementation and confirmed it was already using supabase.auth.getUser() instead of getSession(), which is more secure because it validates the authenticated user with the server. Then it traced the sidebar issue to responsive breakpoint behavior and the sidebar collapse mode. It updated the sidebar from collapsible="icon" to an off-canvas collapse mode so collapsing the sidebar no longer compressed the dashboard content. From this I learned how middleware-based auth depends on verified user checks, and how UI behavior can vary because of responsive layouts and persisted sidebar state.

### Reflection

> The Agent handled the creation of middleware.ts surprisingly well. It created a dedicated middleware helper under the Supabase utilities and then wired the root middleware entrypoint to delegate to that helper instead of duplicating logic. I did not have to manually write the middleware myself, although the Agent did need to inspect the existing project structure and auth-related files first so it could patch them correctly.

>What surprised me most was how many files had to change just to add authentication properly. It wasn’t only a login page — the root layout, sidebar, server actions, Supabase utilities, project pages, middleware, and route handling all needed updates so authentication state could flow consistently through the app.

>Middleware-based auth feels much cleaner than checking login status inside every page component. Instead of repeating authentication logic across pages, the middleware protects routes globally before the page even loads. That makes the app easier to maintain and keeps unauthorized users from reaching protected routes at all, rather than redirecting them after rendering begins.