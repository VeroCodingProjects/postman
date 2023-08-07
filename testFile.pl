#!/usr/bin/env perl
use Mojolicious::Lite;
use Mojo::UserAgent;

get '/' => sub {
    my $c = shift;

    # Get the headers from the query parameters
    my @headers = $c->param('headers[]');

    # Perform validation logic
    my $valid = 1;
    foreach my $header (@headers) {
        my ($key, $value) = @{$header};
        # Add your validation conditions here
        if ($key ne 'my_key' || $value ne 'my_value') {
            $valid = 0;
            last;
        }
    }

    if ($valid) {
        # Make the request to the external API
        my $ua = Mojo::UserAgent->new;
        my $tx = $ua->get('http://makeup-api.herokuapp.com/api/v1/products.json', form => {
            product_tags => 'Hypoallergenic',
            product_type => 'eyeshadow'
        });

        # Check if the request was successful
        if (my $res = $tx->success) {
            my $products = $res->json;
            my $response = { success => 1, products => $products };
            $c->render(json => $response);
        } else {
            my ($err, $code) = $tx->error;
            $c->render(json => { success => 0, error => $err, code => $code });
        }
    } else {
        $c->render(json => { success => 0 });
    }
};

app->start;
__DATA__
