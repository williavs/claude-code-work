Okay, so about four hours ago, Claude Code  released a brand new feature called Custom  
0:03
Subagents, and we'll be going over that  in this video and all the things you can  
0:06
do with it. The docs are also linked down  below, so you can either read them or you  
0:10
can watch this entire video because I'll  be going over the docs. And basically,  
0:13
it's a somewhat formalized approach from what  people have been doing so far. So for example,  
0:17
this person, about one month ago, they said that  you can spawn different subagents in parallel by  
0:22
basically telling Claude Code to do that. But  in reality, it just spawned different tasks in  
0:26
parallel and had them running in parallel. And  other people have been having like an agents.md  
0:31
file in their codebase and then having different  instances of Claude Code running within different  
0:35
terminals and then having the agents coordinate  via the agents.md file. So this approach that  
0:41
Claude Code implemented is somewhat different from  that, and we'll be going through that. Basically,  
Checking Your Claude Code Version
0:45
you want to make sure before getting started  that you are on the right version of Claude  
0:48
Code because the Claude Code version that was  committed four hours ago is 1.0.60, and it says  
0:53
you can create custom subagents for specialized  tasks over here. So if you run claude --version,  
0:59
you can see I'm on the correct version over  here, which is 1.0.60. And if I run claude, then  
1:04
I should be able to write /agents and then see  manage agent configurations over here. So before  
What Are Subagents?
1:10
getting started with showing you what it's like  to run them, we'll read through the documentation  
1:13
first. Basically, Anthropic describes these  subagents as pre-configured AI personalities that  
1:18
Claude Code can delegate tasks to do. Each one has  its own specific purpose and expertise area. It  
1:23
uses its own context window separate from the main  conversation. Which can be quite powerful because  
1:27
when the main conversation gets too long, then the  performance of Claude Code can degrade unless you  
1:32
then summarize the whole conversation or compact  it. Can be configured with specific tools it's  
1:36
allowed to use, which can be quite powerful for  having like read-only agents or agents that can  
1:41
only perform web search. Or like basically there's  a list of tools and I'll be going through that  
1:45
later. Includes a custom system prompt that guides  its behavior. And basically when it encounters a  
1:50
task when Claude Code the main, like thread,  encounters a task that matches a subagent's  
1:54
expertise, then it delegates a task to a subagent  to do instead. Which works independently and  
1:59
then returns the results. So it says that each  subagent operates in its own context preventing  
2:03
pollution of the main conversation. Subagents  can be fine-tuned with detailed instructions  
2:07
leading to higher success rates on designated  tasks. Subagents can be reused across different  
2:12
projects and shared with your team, which can be  powerful because you want to make sure that people  
2:16
are using the same subagents with the same rules  in the same way on the same codebase. And they  
2:20
have flexible permissions as well, which we'll be  going over. So the first thing you can do is you  
How to Create a New Subagent
2:25
can go to your codebase. So I have Claude Code  running in this codebase. And then write /agents  
2:29
over here to get started. And then you can see  we have the built-in general purpose like Claude  
2:34
Code agent. That's always available down here. And  we can create a new agent. So if we press enter,  
2:39
then we can create it either in this particular  project, in the .claude/agents, or we can create  
2:44
one which is on our whole system, which will  be stored in our home system directory. So I'll  
2:49
create it in this project over here. And then you  can either do it manually or you can generate with  
2:53
Claude, which is a recommended approach. And then  you describe what your subagent should be able to  
2:57
do. So if you actually scroll down, Claude  or Anthropic basically recommends that you  
3:02
start with Claude-generated agents. We recommend  you generate your initial subagent with Claude  
3:06
and then iterate on it to make it personally  yours. This approach gives you the best results,  
3:10
a solid foundation that you can customize to your  specific needs. So we're going to start off with  
3:13
a Claude-generated subagent. And I'm basically  going to have a performance analyzer subagent.  
3:18
So it should be able to look through the codebase  and then find performance improvements throughout  
3:20
the codebase. So I can say performance analyzer  subagent that looks through the codebase and  
3:24
finds areas for performance improvements. And  then press enter. I'm sure you can do better  
3:28
prompts over time. And Claude Code gives you some  examples. But they're usually quite simple. And  
Configuring Subagent Tools & Permissions
3:32
now I can decide which tools I want the agent  to be able to access. If I just press continue,  
3:36
then it will be all tools. I can do read-only  tools, edit tools, execution tools, MCP tools.  
3:42
And I can show all the individual tools over here.  So task, bash, multi-edit, webfetch, websearch,  
3:48
and so forth. So because I want this agent to be  a read-only agent and not to make edits itself,  
3:53
I'm going to select to read-only tools over  here. Press enter. And now you can see all these  
3:58
tools which are read-only related are selected,  which is glob, grep, ls, read, exit plan mode,  
4:04
and so forth. And then I'm going to press continue  up here. And now the nice thing is you can choose  
4:10
a color for your agent as well if you like that.  You can choose automatic color or you can choose  
4:14
a specific one. So when you have multiple agents  running, basically like in this example over here,  
4:19
you can see that each agent runs with a different  color. So that can be useful for, I don't know,  
4:23
like color tracking or something. I'm going to  choose purple over here. And then you can see  
Reviewing the Generated Agent File
4:27
it shows the agent file over here. It shows  a description of the agent which tells Claude  
4:31
when to use the agent. And then it has a system  prompt which is cut off over here. But we can  
4:35
press enter. And now in the folder over here, so  this is the folder that I just made the agent in,  
4:42
we have the performance analyzer agent.  And it says, use this agent, blah, blah,  
4:46
blah. These are tools available. It's color purple  over here. And then there's a big system prompt.  
4:51
So we can just continue to use the agent and then  make refinements to it later on when we observe  
4:56
its behavior and notice that we want to make it  perform in a certain way or not to perform in  
5:00
another way. And then of course, you can commit  this file as well to your GitHub repository and  
5:04
then have other people in your team be able to  use the same subagents in this particular project.  
5:08
And actually it seems that project subagents  are given higher priority when deciding which  
5:11
agent to use over user subagents. So I guess if  Claude Code thinks that you can use two different  
5:16
subagents for one particular task, then it will  always choose a project specific one. Anyways,  
5:20
this is a file format that we just saw  earlier. If you omit the tools part,  
5:23
then all tools will be available. These are the  list of tools that you can see. So if you go to  
5:28
the tools documentation over here, you can see all  the tools that are available that you can type in  
5:33
and what exactly they do. And then scrolling down,  you can then manage your subagents as well. So  
5:39
if I were to press exit over here and then write  agents again, then I can see the list of subagents  
5:44
that I have for this particular project. And if  I had like user level subagents, I'd be able to  
5:48
see those as well. And if I press enter, then  I can view, edit, delete, or go back. Now the  
How to Use a Subagent
5:52
way to explicitly invoke a subagent is to use a  subagent name. So you can say use a performance  
5:56
analyzer subagent to suggest improvements to  a project. Press enter over here, and then it  
6:01
will call the subagent. And now you can see I'll  use the performance analyzer agent. And now you  
6:05
can see it uses purple over here, which means the  subagent is ready. It's initializing. And then you  
6:09
can see all the tasks that it's doing over here.  And I'll let it run the commands in the directory.  
6:14
And whilst we're waiting for that, we can see  what else there is over here. So you can have,  
Subagent Examples
6:18
say, a code reviewer subagent. There's an example  over here. A debugger subagent. A data scientist  
6:24
subagent. And the nice thing about it is you can  have different system prompts for each of your  
6:27
subagents. So you can really fine tune and control  behavior rather than having, like, one big prompt  
6:32
and then, like, messing around with them. And they  have some best practices over here, which is using  
6:36
Claude-generated agents. Also design-focused  subagents. So it's better to have subagents  
6:42
with single, clear responsibilities rather than  trying to make one subagent do everything. That's  
6:45
the whole point of having subagents because it  makes it more predictable and it just has better  
6:49
performance as well. Write detailed prompts.  Include specific instructions, examples,  
6:53
and constraints in your system prompts for each  of the subagents. The more guidance you provide,  
6:57
the better the subagent will perform. So I think  this can be quite nice because over time, like,  
7:01
in the next few days and weeks, we will see people  sharing subagents that they made for particular  
7:05
use cases. And then you can copy their system  prompts over to your project if it needs to be.  
7:10
Limit tool access. Only grant tools necessary for  the subagent's purpose. This will improve security  
7:15
and help the subagent focus on relevant actions.  Because often when you have more tools available  
7:19
to an agent in general, or especially when you  see, like, MCP tools, some people have, like, 
7:24
20-30 MCP tools for their particular project.  And the performance really degrades the more  
7:29
tools that you have available because the agent, I  guess, has more choices to make or more decisions  
7:34
to make. And then to also version control your  subagents as well. So your team can benefit and  
7:39
then also improve them collaboratively.  Which means basically committing your  
7:43
subagents to GitHub. And one of the nice things  you can do is you can chain subagents together.  
Chaining Subagents Together
7:47
So I'll go through an example of that shortly. And  I guess over here where it says dynamic subagent  
7:51
selection, you can have your subagent implicitly  called if you make sure your description feels  
7:56
are, like, specific and action-orientated.  So the specific action-orientated, like,  
8:02
description that Claude Code generated for the  subagent we made earlier is use this agent when  
8:07
you need to identify performance bottlenecks,  optimization opportunities, and inefficient code  
8:11
patterns in your codebase. And then it gives  some examples over here. And I'm not going  
8:16
to read through the whole thing. And it has some  performance considerations over here. One of them  
8:19
being latency, because whenever you spawn a new  subagent, it starts off with a clean slate each  
8:24
time. And it may need to, like, gather context  about the codebase before being able to take any  
8:28
actions. So you want to bear that in mind. Because  especially if you have your main thread running,  
8:32
it already has context about the codebase. When  you spawn a subagent, it will, like, then gather  
8:36
the same context again. So we have the performance  analyzer subagent that finished running over here.  
8:40
It took 3 minutes and 28 seconds. And used this  many tokens. And it suggests some high-impact  
8:45
changes and also some quick wins. So we can  actually make another subagent and chain them  
8:49
together. So I'll make two more subagents. And the  first one will be being able to edit the codebase  
8:54
over here. So I'm going to call this... So I'm  just going to call this optimizer subagent. And  
8:58
say, makes high-quality optimizations across a  codebase whilst preserving intent. Press enter  
9:03
and have it generate the configuration for  us. And I'm sure that over the next few days,  
9:06
as more people use this feature, they'll come out  with better prompts about how you can make good  
9:10
subagents. And we're going to give it access to  edit tools and execution tools over here. And I  
9:15
don't think MCPs would be necessary or other tools  would be necessary over here. So we're just going  
9:21
to press continue. And then we will give it the  color of pink. Actually cyan over here. And this  
9:27
is a file that it generated for us. So we can  also read the file in our codebase. And let's  
9:31
make one more subagent, which is our release notes  subagent. So this will write high-quality release  
9:36
notes based on the changes that were made since  the last commit. So I'll press enter over here.  
9:40
And then have this subagent generated too.  And we'll give it read-only tools because  
9:44
sometimes Claude Code or Claude for Sonnet can  get overenthusiastic. And despite you telling  
9:48
it to only read, it can make some changes. So you  don't want to give it more tools than necessary,  
9:52
as Anthropic says. So we're going to press  continue over here after selecting read-only  
9:56
tools. And then make it green. And it made another  agent file. And we'll press enter. And now we have  
10:02
a performance analyzer, code optimizer, and a  release-notes-generator. If we go back to cursor  
10:07
over here, we can see we have the agent files over  here. We have their system prompts. And over time,  
10:12
we can make improvements on these subagents as  we want to change their behavior. So for example,  
10:16
in this release notes generator, we can basically  give it a structure about how it should be able  
10:20
to write the release notes. So now I'm going to  chain the three agents together by saying, can you  
10:23
analyze the performance of the codebase? Then make  optimizations. And finally, write release notes  
10:28
for me in Markdown, all using subagents. And then  press enter. And I think given that I did not give  
10:33
the release-notes-generator subagent the ability  to edit files or create files, it will just give  
10:38
me the markdown in the terminal itself. So you can  see it made a set of todos over here. It made the  
10:44
performance analyzer subagent, the code optimizer  subagent, and the release-notes-generator subagent  
10:48
over here. So unfortunately, it decided to run all  three of the agents in parallel. And I don't want  
10:52
that. So I'm going to have it run them one by one  instead. So I'll just give it the same command,  
10:57
run them one by one. So it says it'll do the  performance analysis first over here. And it's  
11:02
analyzing the performance. And this is much better  than last time because, well, running all three of  
11:07
the agents in parallel or subagents in parallel  would not yield a good performance because, like,  
11:12
it has to be run one by one for this particular  task. But it's still nice to know that you can  
11:16
run different subagents in parallel with one  another. And now you can see the performance  
11:19
analyzer subagent is done over here. And I  think it passed whatever output or context  
11:24
it had onto the code optimizer subagent. So as we  saw earlier, towards the beginning, where it says  
11:31
the performance analyzer has identified these  critical bottlenecks and so forth, it would  
11:34
basically provide this output to the following  subagent over here. So I wish I could see, like,  
11:40
what kind of thing was passed between chaining  these subagents together. So you can see the code  
11:44
optimizer subagent completed all its to-dos  over here. And it had 16 tool uses as well,  
11:49
which is quite interesting. But it's quite nice  that each subagent has its own set of to-dos  
11:53
that I can keep track of. And that took about  3 minutes and 10 seconds to do. And now I think  
11:57
it should pass on to the final subagent, which  is a release-notes-generator. And now you can  
12:01
see it made a set of release notes over here. So  you may want to, like, change a system prompt for  
12:05
this particular subagent to improve the release  notes. And it's interesting that it said, do you  
12:09
want to create a release notes.md file? Because  a subagent should not have access to be able to  
12:14
write to a file. But we'll see what happens if  we press yes. And it seems it did. I guess, like,  
12:19
by default, it just won't write to a file. Let me  just double-check the subagent, actually, to make  
12:23
sure I did not give it those tools accidentally.  And, oh, it actually seems that a release notes  
12:28
subagent can edit and do multi-edits. So  I did not pay attention to that. But yeah,  
12:33
now it made a set of release notes and it made a  bunch of improvements to the file. So basically,  
Advanced Subagent Workflow Example
12:36
the subagent chaining that we had over here  is a performance analyzer, a code optimizer,  
12:40
and a release notes generator. And I imagine  this feature will be getting more powerful in  
12:44
the future, and you can come up with subagents for  your particular workflow. So, for example, you can  
12:48
have, like, a spec writer. So you can, like, have  a subagent that helps you write out a spec, like,  
12:53
following some principles, whatever principles  you may use for software design. And then you  
12:57
have another subagent that runs in parallel with  an example finder. So the example finder goes  
13:02
online and finds example, like, high-quality code  from GitHub or something, and maybe using some  
13:06
MCP tools. And you have a doc agent that uses  something like Context7 over here to be able  
13:12
to find up-to-date documentation for whatever  things are relevant to the spec. And then you  
13:17
have a coding. And then you have another set of  subagents running in parallel. So you would have  
13:21
a README syncer that syncs any changes that were  made by the coding subagent to your README. You'd  
13:28
have it generate some release notes. And then you  may have an i18n translator. So many applications  
13:35
that are internationalized, they have, like,  translation keys. And you may want to have a  
13:38
subagent that checks all the translation keys and  then translates them and fills in any missing keys  
13:44
and so forth. And then you might want to make a  subagent that just writes you some social media  
13:48
posts as well in a style that is applicable  to you. So you might be posting on Twitter  
13:52
after you make this release and you want, like, 10 different draft tweets that you may write about  
13:56
this particular release that just happened.  And you can have a subagent do that for you  
14:01
as well. And I've been seeing a lot more people  using Claude Code for tasks that are not really  
14:05
relevant to coding and software engineering.  So people have been using Claude Code to edit  
14:09
their Obsidian and do other things as well that  are not coding-related. So it seems that Claude  
14:13
Code is just very powerful on its own. It, like,  understands context well, executes it well. And  
14:17
these subagents and being able to come up with  good subagent workflows will make it even more  
14:21
powerful over time. Anyways, because this feature  is very new, not a lot of people have had a chance  
Conclusion
14:25
to try it yet. But over the next week or so,  people will, like, try it more and then share  
14:28
their thoughts and so forth. And I'm sure that  there will be many powerful subagents and system  
14:32
prompts that people do share as well and their  workflows. So in about a week or two weeks, I'll  
14:37
make another video where I share my own workflows  and subagents and other ones that you can try  
14:40
in your own codebase. So basically, do subscribe  for that content and I'll see you next time. Bye.

All

From Ray Amjad

Source code

Learning
