# You are required to create the following accounts to allow the system to be tested. 
All accounts should have the password p455w0rd :
1. user1
2. user2
3. user3
4. admin (only required if attempting the stage 2 functionality).

There should be at least 6 restaurants on the system and each user should have placed at least four reviews. Every restaurant should have at least 2 reviews.

# The root API \ should be viewable without credentials. With credentials a client should receive an restaurant URI endpoint in the data. POSTing to this lets the client add a restaurant. 
This should include the following information:
1. The name of the restaurant.

If there is already a restaurant in the database that shares the same name and postcode (not case sensitive), the restaurant should not be added and an appropriate error returned.

To demonstrate this feature and to prove that the form works correctly you will need to show that the data is being persisted correctly, either by running a database query or an API call depending on the platform and technology you are using.

Research appropriate third-party APIs to integrate with your own. Choose one or more and add their functionality (or some of it) to your own API by providing the external data in HTTP responses to your own API's clients.

For more challenge and thus greater marks, choose a third-party API which requires authentication (e.g. API keys) to access its resources. Your API should do the authentication on behalf of your own client.

External API data should be cached in your own database when first retrieved, so that your API is able to reduce the number of requests being made to the external API(s).The data should be refreshed when appropriate (e.g. according to the Expiresheader or other information about staleness).