export default {
  "fields": [
    {
      "type": "input",
      "inputType": "text",
      "label": "First Name",
      "placeholder": "First name",
      "model": "first_name",
      get: function(model) {
        // transform all characters to upper case
        return model.first_name ? model.first_name.toUpperCase() : ''
      }
    },
    {
      "type": "input",
      "inputType": "text",
      "label": "Last Name",
      "model": "last_name",
      "placeholder": "Last name",
      "required": true
    },
    {
      "type": "input",
      "inputType": "password",
      "label": "Password",
      "placeholder": "Password",
      "model": "password"
    },
    {
      "type": "checkbox",
      "label": "Status",
      "model": "status",
      "default": false
    }
  ],
  "groups": [
    {
      "legend": "User Details",
      "fields": [
        {
          "type": "input",
          "inputType": "text",
          "label": "Name",
          "model": "name"
        },
        {
          "type": "input",
          "inputType": "number",
          "id": "current_age",
          "label": "Age",
          "model": "age"
        }
      ]
    }
  ]
}
