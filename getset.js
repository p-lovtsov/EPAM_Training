function User() {
    var firstName = '';
    var surname = '';
    
    this.setFirstName = function (name) {
        if (typeof name === 'undefined') {
            return console.log( 'error');
        }
        var name1 = name.trim();
        if (typeof name1 !== 'string' && name1 !== ' ') {
            return 'Error';
        }
        return firstName = name1;
    }
    this.setSurname = function (sur) {
        if (typeof sur === 'undefined') {
            return console.log( 'error');
        }
        var sur1 = sur.trim();
        if (typeof sur1 !== 'string' && sur1 !== undefined && name1 !== ' ') {
            return 'Error';
        }
        return surname = sur1;
    }
    this.getFullName = function () {
        return firstName + " " +surname;
    }
  }
  
  var user = new User();
  user.setFirstName();
  user.setFirstName(" Петя");
  user.setSurname();
  console.log(user.getFullName());
  user.setFirstName(1);
  user.setSurname("Иванов");
  
  console.log( user.getFullName() ); // Петя Иванов