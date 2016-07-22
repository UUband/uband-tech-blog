# when
However, if you find that you need to control which process a certain component belongs to, you can do so in the manifest file.

# what
The manifest entry for each type of component element (**activity** , **service**, **receiver**, and **provider**) supports an **android:process** attribute that can specify a process in which that component should run.

# process lifecycle
Android ranks a process at the highest level it can, based upon the importance of the components currently active in the process.
In addition, a process's ranking might be increased because other processes are dependent on it—a process that is serving another process can never be ranked lower than the process it is serving.
Because a process running a service is ranked higher than a process with background activities, an activity that initiates a long-running operation might do well to start a service for that operation, rather than simply create a worker thread—particularly if the operation will likely outlast the activity.

## five types
### foreground process
A process that is required for what the user is currently doing. A process is considered to be in the foreground if any of the following conditions are true:
1. It hosts an Activity that the user is interacting with (the Activity's onResume() method has been called).
2. It hosts a Service that's bound to the activity that the user is interacting with.
3. It hosts a Service that's running "in the foreground"—the service has called startForeground().
4. It hosts a Service that's executing one of its lifecycle callbacks (onCreate(), onStart(), or onDestroy()).
5. It hosts a BroadcastReceiver that's executing its onReceive() method.

### visible process
A process that doesn't have any foreground components, but still can affect what the user sees on screen. A process is considered to be visible if either of the following conditions are true:
1. It hosts an Activity that is not in the foreground, but is still visible to the user (its onPause() method has been called). This might occur, for example, if the foreground activity started a dialog, which allows the previous activity to be seen behind it.
2. It hosts a Service that's bound to a visible (or foreground) activity.

### service process
A process that is running a service that has been started with the startService() method and does not fall into either of the two higher categories.

### background process
A process holding an activity that's not currently visible to the user (the activity's onStop() method has been called)

### empty process
A process that doesn't hold any active application components.
