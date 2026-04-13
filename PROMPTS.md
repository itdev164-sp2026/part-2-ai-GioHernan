# Prompting Log — ITDEV-164

## Activity 1: The AI-Native Launchpad

### Prompt 1
**What I asked:**
> Look at the existing src/app/page.tsx and src/app/layout.tsx in this project.
Replace the current homepage content with a "Developer Profile" page for me.
It should include:

My name: [Your Name]
A short bio (1-2 sentences about being a web development student)
A "Skills" section that displays at least 6 skills in a responsive
Tailwind CSS grid (use cards with icons from lucide-react)
Keep the existing Header component and layout structure intact.
If you need to create new components, go ahead and create them in
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

It updated layout.tsx to use the new sidebar system and wrapped the existing page content inside the main content area. My Developer Profile from Activity 1 was still there, which means it followed the instruction to preserve it. The dark mode toggle also continued to work.

Overall, the Agent worked carefully and made changes across multiple files without breaking the app.

### Prompt 2
**What I asked:**
> Does the sidebar use the Shadcn Sidebar components (not a custom div)?
Are the icons imported from lucide-react?
Is the Developer Profile content still intact?
Does the layout use SidebarProvider and SidebarInset correctly?


Are these met after you made adjustemenets to the files?

**What happened:**
> Yes, all the requirements were met after the Agent made changes.

The sidebar is built using the Shadcn components from shadcn/ui, not just a custom div. It uses the proper sidebar structure like Sidebar and SidebarMenu.

The icons are correctly imported from lucide-react and used for the navigation links.

My Developer Profile content from Activity 1 is still intact in page.tsx, so nothing important was deleted or overwritten.

The layout also correctly uses SidebarProvider and SidebarInset, which means the sidebar and main content are connected properly.

Overall, everything works as expected and the Agent followed all the instructions correctly.

### Reflection
> Did the Agent accidentally delete or overwrite any of your Activity 1
> code? If so, how did you recover? (Copilot Edits has an "Undo" /
> "Revert" button — did you use it?) What did you learn about giving
> the Agent context about existing code you want to preserve?

I didn't see agent overwriting anything related to Activity 1. The Changes that he made were mainly focused on today's activity. However, I was still checking that nothing got changed.
Besides of that, I didn't have to use the revert button.
I learned that giving the right commands and being specific as to what files are you lookingto get changed, the agent will do the work. Also, I like the fact that he also explains the process that he does in order to make the changes.