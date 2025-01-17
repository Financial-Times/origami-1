## Migration

### Migrating from v9 to v10
To migrate you need to have the coral API in version 7 and change the urls to fetch fonts and styles on coral API admin to fetch styles from this version . See more in (documentation)[https://docs.coralproject.net/migrating-6-to-7#after-coral-has-been-updated-to-v7]

### Migrating from v8 to v9

To migrate update your projects use of the `oComments` sass mixin. Set its `coral-talk-iframe` option to `false`.

```diff
-@include oComments();
+@include oComments($opts: ('coral-talk-iframe': false));
```

### Migrating from v7 to v8

Support for Bower and version 2 of the Origami Build Service have been removed.

Follow [the migration guide on the Origami website](https://origami.ft.com/documentation/tutorials/bower-to-npm/).

### Migrating from v6 to v7

Dependencies have all been updated to the latest major versions. If you have any conflicts while installing this version, you'll need to first upgrade those dependencies also. See [the Bower config for these](./bower.json).

### Migrating from v5 to v6

In version 6 the commenting provider has been updated from Livefyre to [Coral Talk](https://coralproject.net/talk/) and as a result version 6 is a complete rewrite.


#### Event naming

In v6 the naming of events has changed and all events use a dot notation.

The table below shows the mapping of old events to new.

| Old event              | New event                   |
| ---------------------- | --------------------------- |
| error.init             | Not mapped yet              |
| error.widget           | Not mapped yet              |
| error.livefyreJs       | Deprecated                  |
| data.init              | Not mapped yet              |
| data.auth              | Not mapped yet              |
| widget.timeout         | Not mapped yet              |
| widget.ready           | Deprecation candidate       |
| widget.load            | Deprecation candidate       |
| widget.renderComplete  | oComments.ready             |
| tracking.postComment   | oComments.postComment       |
| tracking.likeComment   | ocomments.likeComment       |
| tracking.shareComment  | Deprecation candidate       |
| tracking.socialMention | Deprecated                  |
| auth.login             | Not mapped yet              |
| auth.loginRequired     | Not mapped yet              |


### Migrating from v4 to v5

The dependency `dom-delegate` has been replaced by `ftdomdelegate`. If your project depends on `dom-delegate`, switch to `ftdomdelegate@^3.0.0` instead -- their api is the same, but `dom-delegate` is now deprecated. Ensure your project builds without conflicts.
