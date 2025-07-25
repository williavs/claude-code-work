So, it's pretty clear that right now
0:01
Claude Code seems to be the most capable
0:03
tool for professionals who are building
0:05
with AI and I'm more and more impressed
0:08
with it by the day. But when it comes to
0:10
my workflow of working with Claude Code
0:13
every day, there's still one thing that
0:16
kind of bothers me. So, I'll give Cloud
0:18
Code a big task to work on. I'll let it
0:20
run and then I wait.
0:23
Still waiting,
0:25
watching it. It's doing its thing.
0:28
waiting. And while Claude is working, I
0:31
can't really do much because Claude code
0:34
is working on the same git branch that
0:35
I'm currently working on. So if I want
0:37
to keep making progress on this feature
0:39
over here while Claude is doing its
0:41
thing over there, or if I want to spin
0:43
up multiple cloud code agents, it's all
0:46
going to be on the same branch and
0:47
that'll result in a lot of conflicts and
0:50
that'll just be a mess. In this video,
0:51
I'll show you the right way to do it
0:53
using Git work trees. More importantly,
0:55
we're going to set up a workflow that's
0:58
fast and easy to be able to spin up
1:00
multiple cloud code agents working in
1:02
parallel anytime we need to so that we
1:05
can stay in the flow, keep making
1:07
progress, and ship our products way
1:10
faster. So, in my last video on this
1:11
channel, I made the case for Cloud Code
1:13
and where it fits in alongside other
1:16
agentic coding tools like cursor. And in
1:19
that video, I showed you how Cloud Code
1:22
really shines as an autonomous coding
1:24
agent. And that's why multitasking with
1:27
Cloud Code seems like the most obvious
1:29
next step. So, if you're a subscriber to
1:31
this channel, then you know that I'm
1:32
talking to pros like you and me. We want
1:35
to stay ahead of the curve when it comes
1:37
to building with AI. And I'm also
1:39
sending a weekly newsletter called the
1:42
builder briefing. It's free. It's a
1:44
five-minute read to help you stay sharp
1:46
as a builder. You can get your builder
1:49
briefing by going to buildermethods.com
1:52
and subscribers will be the first to
1:54
know about my Claude Code course coming
1:56
later this year. Now, you might be
Parallel Claude Code sessions
1:58
wondering, why can't we just open up
2:00
multiple Claude Code instances on
2:02
separate terminal tabs? Well, as long as
2:05
we're working in the same codebase, then
2:08
all of your terminal tabs are going to
2:09
be working on the same Git branch.
2:11
That's even the case if you have
2:13
multiple applications that can run
2:15
terminal. Now that might seem obvious,
2:17
but I just want to make it clear that if
2:19
you and other people on your team or
2:22
other agents are all working in the same
2:24
files in the same codebase on the same
2:27
git branch, then that can obviously lead
2:29
to conflicts. So how does anthropic
2:32
actually suggest we solve this problem?
2:34
Well, in the cloud code docs, kind of
2:35
buried under this common workflows page,
2:38
there's this section on running parallel
2:41
cloud code sessions using git work
2:43
trees. What are git work trees? Well,
2:45
instead of just creating another branch,
2:47
which would allow you to work on the
2:49
same set of files as others, a git work
2:51
tree will copy your entire codebase, all
2:54
the files, all the folders into another
2:57
directory on your system. And by doing
2:59
that, it enables you or the agent to
3:02
work on its own branch in the copied
3:04
codebase. Meaning the work is getting
3:06
done on entirely different set of files
3:09
than your main codebase. And when the
3:11
work is done on that copied codebase on
3:13
the work tree branch, you can merge it
3:15
back into the main branch just like you
3:17
normally would. All right, let's see
3:18
this in action. All right, we're going
Git worktrees, explained
3:20
to start with a simple example first and
3:22
then we'll get into automating the whole
3:24
workflow so that it's fast and easy to
3:27
spin up multiple agents using git work
3:30
trees. Now, today I'm working on an
3:32
example Rails app. It's called Music
3:34
Shop. It's just going to be a simple app
3:36
to uh sort of track inventory for
3:38
different musical instruments. Um, so
3:40
far I've just added guitars and I can,
3:43
you know, create a new guitar and give
3:45
it a name and edit it and view the
3:47
guitar. Super simple little CRUD app
3:49
here. And throughout this video, we're
3:50
going to be adding to this by adding
3:52
other instruments into our uh, inventory
3:55
tracker, if you will. So, we're going to
3:56
start by just understanding how git work
3:58
trees work, right? So, as you can see
4:01
here, I'm on the main branch of my uh,
4:04
project here, and I'm going to just open
4:05
it in Finder. So, inside this temp
4:08
folder on my system, I've got music
4:10
shop. This is our actual codebase. Uh,
4:12
and you know, you can see all the files
4:14
and folders for the app here. Now,
4:16
before I can create a git work tree, I
4:18
need to create a folder on my system
4:21
where we want to place the copied code
4:23
base or code bases into as we create
4:25
more and more work trees, right? So,
4:27
I'll just put it on my system uh inside
4:30
my temp folder. And what I like to do is
4:32
create a work trees folder that is
4:34
adjacent to my projects folder. So
4:37
again, my my project folder was named
4:39
music shop. So I'm going to do music
4:40
shop dash work trees.
4:45
Let's take a look at the folder now. So
4:47
now I have my main application and I
4:50
just created this directory music shop
4:53
work trees. As you can see, they're
4:54
they're right next to each other. So
4:55
that'll just make it easy for me to like
4:57
see each project and see the the related
5:00
work trees. Okay, so now we can spin up
5:02
the git work tree. So I'm going to do
5:04
get work tree
5:07
add. And we also want to create a branch
5:10
for this. We'll call this feature name.
5:12
And then we need to specify the
5:14
destination for where we're going to
5:15
copy the files to. We're going to sort
5:17
of back out one level into that music
5:20
shop work trees directory. And then I
5:23
need to name the folder for the copied
5:26
codebase. I like to keep it the same as
5:27
the branch name. So, we're just going to
5:29
do feature name. Okay. So, that just
5:32
created a work tree. Let's take a look
5:34
at our folder. And so, now we have our
5:36
main music shop project. And then inside
5:39
music shop work trees, we have this
5:42
folder called feature name. And inside
5:44
that is our entire app. Again, all the
5:47
files and folders, the whole codebase
5:49
has been copied here, including git. So,
5:51
it's going to be tracked. So going
5:53
forward now I can just create more and
5:55
more work trees for every new big
5:58
feature that either I'm going to work on
6:00
or an individual cloud code agent can
6:02
work on. So this folder is just going to
6:04
keep like building up with work trees
6:06
unless I you know remove the work trees
6:08
which we can do later. Now here we can
6:10
do get work tree list to see the list of
6:13
all of the work trees that we currently
6:15
have. As you can see we have the main
6:17
branch here and then it gives us the
6:19
location of this other uh work tree.
6:21
Now, you might be wondering, why did I
6:23
create this music shop work trees folder
6:25
outside of the main project folder,
6:28
right? Like, why didn't I just create
6:30
this inside as like a subfolder to have
6:33
the the work trees inside the main
6:34
project? And actually, I asked Claude
6:36
that very question to get a good
6:38
understanding of what the best practice
6:39
is here. And Claude recommends that it
6:42
is not recommended for several reasons.
6:44
One is, you know, git will track all the
6:46
workree directories unless you add it to
6:48
your git ignore, which you could do.
6:50
that could be errorprone. You could
6:51
accidentally commit these entire copied
6:54
code bases to your repository. You know,
6:56
git and various tools could sort of get
6:58
confused with like nested repositories.
7:01
And also like depending on your codebase
7:02
and your IDE, various tooling um that
7:06
stuff can like depend and and
7:07
recursively uh scan directories in your
7:10
project. So if again if it's scanning
7:12
your main directory and then a whole
7:14
copy inside it, that can sort sort of
7:16
become a mess. So, you know, the better
7:18
approach here, of course, is to have
7:19
your project and then have a work trees
7:22
directory. In this case, it's sort of
7:24
suggesting just create other directories
7:25
right next to it. I like to put them
7:27
inside a folder called work trees, you
7:30
know, because uh when I have my like
7:32
active projects, I'm going to have like
7:33
many projects in here. So, each project
7:36
should have the main folder and its work
7:38
trees folder and then in there um that's
7:41
where I put all the trees. So, you know,
7:42
that's just like my method of of
7:44
organizing it. Okay, so now I'm in the
7:46
feature name uh branch and my terminal
7:49
is set up to show me my current branch.
7:51
And so this would be fine. Like I I
7:53
could run Claude right here and have
7:55
Claude work on that branch inside the
7:58
feature name codebase. That would work
8:01
fine. But one thing that could trip you
8:03
up is that here in cursor, if we want to
8:05
like review the the work that Claude did
8:07
or review some file changes from the
8:10
feature name uh branch and codebase,
8:13
that's not going to be found here
8:14
because here these files are still in my
8:17
main music shop folder. So what I do is
8:20
I actually open up a second cursor
8:22
window. So I'm going to do this and then
8:24
I can just open up the folder.
8:28
And so now here, this is a second cursor
8:30
window. I've got that copied codebase
8:33
and the terminal and branch for that.
8:35
And this is where I can run Claude. And
8:38
what I actually like to do, I'm one of
8:39
those weirdos who likes to use a single
8:41
monitor, believe it or not. Um, I'll
8:43
throw this into a second desktop, and
8:46
then I can switch between my main branch
8:48
here, music shop, and then here I am in
8:51
the feature name branch. Just like that.
8:53
And later we'll we'll do this like
8:55
three, four times, and I'll have, you
8:56
know, different uh different branches
8:58
going. Now that whole process of course
Claude Code Slash Command
9:00
was a lot of leg work. We don't want to
9:02
have to do that every time we want to
9:04
spin up a new cloud code agent on a new
9:07
git work tree. So let's automate it. So
9:09
my first idea of course is to use cloud
9:12
code itself to handle the task of
9:15
spinning up a work tree and setting
9:17
itself up so that it can start to work
9:18
on a task on its own workree branch. So
9:22
for that we could try creating a custom
9:24
slash command for cloud code. Let's see
9:27
how far we get with that. All right. All
9:28
right. So to create a custom slash
9:30
command, you'll go into the claude
9:32
folder. If you don't have one already,
9:33
create a cloud folder. Inside that,
9:36
create commands. And then inside that,
9:40
we're going to create a file called
9:42
create worktree.md.
9:45
All right. So this is where we will put
9:46
in the instructions that cloud code can
9:49
follow every time we call this command.
9:51
And so I already prepared these. It just
9:53
says follow these steps to create a git
9:55
work tree. Get the current project
9:57
folders name. So in this case, it would
9:59
get the name music shop. Create a new
10:01
folder adjacent to the current projects
10:04
folder and name it with that project's
10:06
folder name-work trees. I gave it an
10:09
example for how to do that. And then
10:11
create a git work tree and a branch. And
10:13
we're going to pass it an argument. This
10:15
will be the branch name and the folder
10:17
name that we want to use. And it'll save
10:19
it inside that folder. And then I'm
10:22
asking Cloud Code to go ahead and CD
10:24
into that uh folder created inside the
10:26
workre folder. All right, so I'm going
10:28
to fire up Claude. Of course, I could
10:30
use the built-in Claude integration with
10:32
cursor, but I actually like using it in
10:34
the terminal a little bit better for
10:36
whatever reason. All right, so I'm going
10:38
to go ahead and uh use our new command
10:41
that's create workree. It's right here
10:43
at the top. So I'm going to tab and then
10:45
I'm going to put in the name of the
10:47
branch. This is the argument that I'm
10:48
passing into the slash command. We'll
10:51
call this example feature. All right.
10:53
So, I'm going to let that run and let's
10:55
see how we do.
10:57
I'm going to turn on autoedits so that
10:59
it can just go ahead and do it. Looks
11:02
like it got the project folder name.
11:03
That's good.
11:08
All right. So, we created the adjacent
11:10
folder
11:11
and it's creating the git workree.
11:14
Aha. What's this? All right. So, we ran
11:17
into a little bit of a hitch here. We
11:19
actually got pretty far. We did get the
11:20
folder name. We created our work trees
11:22
folder and in this case that folder had
11:25
already been created. It was able to
11:27
create the git work tree and inside it I
11:30
can see example feature. So you know
11:32
again it did copy the whole codebase. So
11:34
it got it got that far but claude itself
11:37
can't cd into that folder because we're
11:41
currently working within the confines of
11:43
the main project folder. So, you know,
11:45
Claude doesn't have the security
11:46
permissions to back out of that folder
11:49
and go elsewhere on my file system.
11:51
Claude can only operate within the main
11:54
project folder and into the subfolders.
11:56
And so, that's what this error is is
11:58
telling us here. And, you know, that's
12:00
sort of like the conclusion that Claude
12:02
gave us right here. So, that's a good
12:05
start. And, you know, maybe you can get
12:06
something like this working for you. But
12:08
in my opinion, there's still a few more
12:10
steps that we need to handle, like
12:12
opening up a new window and cding into
12:14
it and just getting ready to go. I'd
12:16
like all of it to be automated in one
12:19
shot, much faster than all this. So, my
Terminal Script for Creating Git Worktrees
12:21
next idea is to use a terminal alias
12:24
with a script that can do all of that
12:27
stuff and even fire up a new window for
12:29
us and CD into it. And so, to get that
12:31
script going, why don't we just have
12:33
Claude write it for us, right? So, for
12:35
this kind of thing, like a standalone
12:36
script that I'm going to, you know,
12:38
install on my system, instead of using
12:40
cursor or claude code, I like to just go
12:43
straight into uh Claude itself or
12:45
sometimes I'll use chat GPT and I'll
12:47
drop in my prompt here and I and I'll
12:49
get this little standalone script
12:51
created for me right here. Okay, so here
12:53
is the prompt that I'm giving it. Uh,
12:55
I'm using ZSH. So, create a script for
12:58
my ZSHRC file so that I can run an alias
13:01
like this. I want it to be WT space
13:04
branch name and I'm explaining that that
13:06
should do the following. Basically what
13:08
we've been doing like create a folder
13:10
adjacent to the current projects folder
13:11
get the project name it accordingly um
13:14
and then create a git work tree and
13:16
branch using the name that is passed via
13:19
the alias argument and then open the new
13:22
feature name work tree folder in a new
13:25
window using cursor and I'm asking it to
13:27
add a comment above every line in the
13:30
script so that I can sort of read
13:31
through it and understand what it built.
13:36
All right. So, it's using a clawed
13:38
artifact. Cool. So, this pretty much
13:41
looks good. I just wanted to sort of
13:43
like demonstrate the process of working
13:45
with claw to create little scripts like
13:47
this. I do this kind of thing all the
13:48
time. And I actually already created my
13:51
own version of this. So, I'm not going
13:52
to use this one. I'm going to use the
13:53
one that I already have. You know,
13:54
you're going to want to custom and tweak
13:56
it to your particular system and the
13:58
types of projects that you work on, of
14:00
course. But, you know, just to show you
14:02
mine, this is my uh Zshrc file on my
14:05
system. So this is my WT alias and the
14:09
script. You know, it's basically doing
14:11
all those things. It creates the folder,
14:13
gets the parent folder name, names it
14:15
accordingly. But this part is actually
14:17
important. You'll probably have to do
14:18
some version of this in your script. One
14:21
is to copy over the.env file if if you
14:25
have that, you know, because that file
14:27
won't be copied into the workree folders
14:30
by default. So I'm actually having the
14:31
script handle that piece. I'm also
14:34
making sure that these other hidden
14:35
folders, if they exist, also should be
14:38
copied in. I want to get the claude
14:40
folder. I want to get the cursor folder
14:42
so that my rules and settings from
14:44
claude and andor cursor are also copied
14:47
in. I use my instrumental components
14:49
library for Ruby on Rails. So, um, if
14:52
you're a Rails person, you might find
14:53
that interesting. And I'm starting to
14:55
use a thing that I built called AgentOS.
14:58
And I'm going to have another video
14:59
about agent OS coming very soon. That's
15:02
a whole operating system for delegating
15:04
large projects to agents. I'll have more
15:06
on that later, but that that's going to
15:08
have its own folder as well. So, I want
15:09
to make sure that all that stuff gets
15:11
copied into the workree folder and
15:14
that's what this block handles.
15:16
Everything else is pretty much the same
15:17
and then it gives me sort of a success
15:19
message. So, let's go ahead and try it
15:21
out. And when we do this, let's actually
15:23
start to create some new features in our
15:26
music shop project here. So, I've
15:28
already added guitars. I want to add
15:30
drums, keyboards, and basses as the
15:33
other three instruments that we want to
15:35
inventory here in this app. And to build
15:37
those out, I'm going to use my new work
15:39
tree script to fire up the work tree.
15:42
Then I'm going to open up Claude Code in
15:44
each of those work trees, and I'm going
15:45
to have those three different instances
15:47
of Cloud Code, all adding the uh
15:50
additional features to this project. All
15:52
right, so I'm going to use my script WT.
15:55
Let's start with drums.
15:59
Okay, so that happened super fast. You
16:02
might not have caught that, but that
16:03
actually opened up a second cursor
16:05
window. And I'm going to use my um my
16:08
raycast shortcut to throw that window
16:11
into another desktop, another raycast
16:14
shortcut to fit it to the size. And so
16:16
now I can use my Mac OS shortcut to
16:19
just, you know, go between this uh music
16:21
shop. This is like my main project
16:23
folder. And then here is the drums
16:25
folder.
16:27
So let's check out our folder now. So
16:30
now we see under work trees that these
16:32
were the examples from earlier and now
16:34
we have another one called drums. Again
16:37
it's the whole codebase copied into it.
16:39
That looks good. So here I'm looking at
16:41
my main folder. I'm on the main branch.
16:44
And then here I'm on the drums folder.
16:46
And you can see in the terminal I'm on
16:48
the drums branch. Cool. Let's go ahead
16:51
and do the same thing for bases.
16:56
All right. So, I'm going to throw this
16:58
into yet another desktop. So, now I can
17:02
go like that. This is desktop one. This
17:05
is my main folder. This is desktop two.
17:08
I've got uh the drums folder and the
17:10
drums branch. And then this is desktop
17:12
3. Here's bases. And uh here is um the
17:16
bases branch. Let's do one more. I'm
17:19
going to do I'm going to clear this. Do
17:21
WT again. This will be keyboards. All
17:24
right. So, here is my keyboards window.
17:27
I'm going to throw that into another
17:30
desktop. All right. So, now I've got
17:32
here I'm back to one. So, here is my
17:34
main folder, music shop. Here is two.
17:37
This is drums. Here's three bases. And
17:41
here's four keyboards. All right. So,
17:44
now I'm going to go to the drums. And
17:46
I'm going to fire up Claude Code. I'll
17:48
just type Claude. And by the way, we
17:51
have copied in here, you know, that
17:53
command from earlier, which we're not
17:55
really going to use for now. Um, it did
17:57
copy in my settings. So, the permissions
17:59
that I had granted earlier, those will
18:02
now already be pre-granted here. And,
18:05
you know, this list can can grow over
18:06
time. It also copied in my Claude MD.
18:10
Now, this is something that I actually
18:11
didn't cover in the beginning of the
18:12
video here, but in a new project,
18:14
whenever I'm start using cloud code,
18:16
it's always a good idea to do claude
18:17
init. and and Claude will actually do
18:20
its own uh sort of spidering through
18:22
your codebase and write its own claude
18:24
MD file to sort of get oriented with how
18:27
everything works in the codebase. So it
18:29
did that on the main project and then
18:31
when we created the workree folder, it
18:33
copied that in here in the drums
18:35
project. And then same thing over here.
18:37
Let's fire up claude for bases.
18:41
And then we'll fire up another Claude
18:43
for keyboards. So now I have three
18:46
instances of cloud code all fired up on
18:50
three different branches inside three
18:53
different code bases. Again, just to
18:56
just to really illustrate this, let's
18:58
look at our folder. This is music shop.
19:01
This is my main project folder. This is
19:03
our work trees folder. And inside we
19:05
have bases, drums, and keyboards. Three
19:09
different copies of the codebase. Okay.
19:12
So, I'm in the drums work tree here, and
19:14
I'm going to give Claude Code uh the
19:16
prompt for creating the drums resource
19:19
in my app. I already prepared these
19:21
prompts for adding drums and bases and
19:23
keyboards. It's not quite as relevant
19:26
for this video, but basically what I'm
19:27
doing here for each one is I'm I'm
19:29
telling it to use my instrumental
19:31
components component generator library
19:34
for Ruby on Rails. It's a Rails thing.
19:36
That's sort of a separate topic for
19:38
another day. But I'm I'm actually
19:40
instructing it to use that to create uh
19:43
our uh drums resource and that will you
19:46
know fire up the the routes and the
19:48
controllers and the models and the views
19:50
run the migrations. I'm also asking it
19:52
to add the drums to um this navigation.
19:57
So each of those branches should be
19:58
adding another one to the navigation.
20:01
Now, we might run into some some
20:02
conflicts there and we can deal with
20:04
those, but uh yeah, let's go ahead and
20:06
do that. Okay, so that is starting up.
20:09
I'm going to go ahead and fire up the
20:11
other one. So, here is bases. So, I'm
20:13
going to go into bases and I'm going to
20:15
paste that in and start that up. And
20:18
then the last one was keyboards.
20:23
And that's starting up as well. And make
20:25
sure auto accept edits is on. Okay, so
20:28
it looks like the task of adding drums
20:30
has completed
20:32
and the bases task has also been
20:35
completed and the keyboards has been
20:37
completed. So now let's go back to the
20:39
drums codebase here and in a separate
20:42
terminal. I want to check it out and
20:44
take a look. Right? So this is another
20:45
tip is to run the server on a different
20:49
port than your original server. Right?
20:52
So, if I go back here and um and if I'm
20:55
running, you know, music shop, I have a
20:56
shortcut to run my my Rails server. Um
20:59
that's going to run on port 3000, right?
21:01
So, if I look at this, I'm looking at
21:04
the music shop, the the main project
21:07
folder here, which only has guitars.
21:10
But here in drums, again, I have a
21:12
shortcut to do that, which is going to
21:15
run my rail server on uh port 3002,
21:20
right? So this will be like our second
21:21
one. So if I go back to my Chrome and go
21:26
to two or 3002, it's a separate
21:29
database. So I'm going to need to
21:30
actually create a separate user. Okay,
21:32
cool. Actually, that that worked really
21:34
well. It added the the drums navigation
21:36
item here. And I can, you know, create a
21:38
new drum. And yeah, that's looking good.
21:40
So now I've got guitars and drums.
21:43
Sweet. All right, let's go to bases. So
21:45
I'm going to open up another terminal
21:47
here. I'm going to do RR3. That's my
21:49
alias uh on my system running the rail
21:52
server on port 3003. So if I go back
21:55
here and do localhost 3003
22:00
again it's a separate database. Okay. So
22:02
this one has guitars and basses. This
22:06
one has guitars and drums. And this one
22:09
only has guitars.
22:11
To to finish this out I will um take a
22:14
look at keyboards.
22:16
for that we'll do RR4.
22:19
So that's going to be running my server
22:20
on port 3004.
22:23
Okay, so here are keyboards and I can
22:26
create another keyboard. Looks good. So
22:29
again, we have our main folder which
22:31
still only has guitars. So we need to
22:33
merge these three into our main project.
22:37
All right. So first on the drums branch,
22:39
let's stop that server and let's commit.
22:43
And let's also commit the work for bases
22:45
before we we forget. I'm going to do
22:47
added bases. Again, I have uh terminal
22:51
shortcuts for this
22:53
and keyboards.
22:56
Cool. All right. Now, let's go back to
23:00
our main branch here. You know, normally
23:02
you might want to do a pull request, but
23:03
just to to keep it fast for this demo,
23:06
let's go ahead and merge drums. Okay, so
23:09
we have merged the drums and now I'm
23:11
running the server on localhost 3000.
23:14
That's the main folder for the project.
23:16
I now have home, guitar, and drums.
23:20
Okay, so now let's go ahead and merge uh
23:22
the other two, bases and keyboards.
23:25
Okay, so um this was sort of expected.
23:28
Uh there there is a merge conflict when
23:30
I'm adding bases. And so let's uh take a
23:32
look and resolve these just like we
23:34
would need to resolve any merge
23:36
conflicts, you know, when working with
23:37
with a team member who just contributed
23:39
something, right? So, and I'm going to
23:40
clean this up a little bit. I'm cursor
23:42
sort of uh corrected the rest there for
23:45
bases, and we should be good to go.
23:47
Let's take a look. Yep. All right. So,
23:49
there's bases. So, now we have guitars,
23:51
drums, bases. Last one is keyboards.
23:56
We're probably going to need to go
23:57
through the same uh song and dance
24:00
there. Let's do get merge keyboards. All
24:04
right. So, we're all set there. Now, we
24:05
have all of our instruments uh all set
24:08
up in our main codebase. So, that's how
24:10
you can multitask with Claude code
24:13
running multiple agents in parallel.
24:16
It's pretty powerful stuff. So, right
24:18
after you hit subscribe on this channel,
24:20
I've got another video where I go into
24:21
the movement that Claude Code has
24:24
introduced into the picture for us as
24:26
professional builders. We're entering
24:28
into agentic development. It's really
24:32
exciting, really interesting. Things are
24:34
moving super fast. So, I'll see you over
24:36
there.